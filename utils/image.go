package utils

import (
	"errors"
	"fmt"
	"os"
	"os/exec"
	"regexp"
	"strconv"
	"strings"

	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
)

/*
#gravity可用值有九个,分别是:

西北方 NorthWest：左上角为坐标原点，x轴从左到右，y轴从上到下，也是默认值。
北方   North：上部中间位置为坐标原点，x轴从左到右，y轴从上到下。
东北方 NorthEast：右上角位置为坐标原点，x轴从右到左，y轴从上到下。
西方   West：左边缘中间位置为坐标原点，x轴从左到右，y轴从上到下。
中央   Center：正中间位置为坐标原点，x轴从左到右，y轴从上到下。
东方   East：右边缘的中间位置为坐标原点，x轴从右到左，y轴从上到下。
西南方 SouthWest：左下角为坐标原点，x轴从左到右，y轴从下到上。
南方   South：下边缘的中间为坐标原点，x轴从左到右，y轴从下到上。
东南方 SouthEast：右下角坐标原点，x轴从右到左，y轴从下到上。
*/
func Thumbnail(mode string, input_file string, output_file string, output_size string, output_align string, background string) error {
	// 预处理gif格式
	if strings.HasSuffix(input_file, "gif") {
		if Exist(input_file) {
			/*
				convert input_file -coalesce m_file
			*/
			cmd := exec.Command("convert", "-coalesce", input_file, input_file)
			err := cmd.Run()

			return err
		} else {
			return errors.New("需要被缩略处理的GIF图片文件并不存在!")
		}
	}

	switch {
	case mode == "resize":
		if Exist(input_file) {
			/*
				convert -resize 256x256^ -gravity center -extent 256x256  src.jpg dest.jpg
				详细使用格式 http://www.imagemagick.org/Usage/resize/
			*/
			cmd := exec.Command("convert", "-resize", output_size+"^", "-gravity", output_align, "-extent", output_size, "-background", background, input_file, output_file)
			err := cmd.Run()

			return err
		} else {
			return errors.New("需要被缩略处理的图片文件并不存在!")
		}
	case mode == "crop":
		if Exist(input_file) {
			/*
			   convert -crop 300×400 center src.jpg dest.jpg 从src.jpg坐标为x:10 y:10截取300×400的图片存为dest.jpg
			   convert -crop 300×400-10+10 src.jpg dest.jpg 从src.jpg坐标为x:0 y:10截取290×400的图片存为dest.jpg
			   详细使用格式 http://www.imagemagick.org/Usage/crop/
			*/
			cmd := exec.Command("convert", "-gravity", output_align, "-crop", output_size+"+0+0", "+repage", "-background", background, "-extent", output_size, input_file, output_file)
			err := cmd.Run()

			return err
		} else {
			return errors.New("需要被缩略处理的图片文件并不存在!")
		}
	default:
		if Exist(input_file) {

			cmd := exec.Command("convert", "-thumbnail", output_size, "-background", background, "-gravity", output_align, "-extent", output_size, input_file, output_file)
			err := cmd.Run()

			return err
		} else {
			return errors.New("需要被缩略处理的图片文件并不存在!")
		}
	}

}

func Watermark(watermark_file string, input_file string, output_file string, output_align string) error {
	//composite -gravity southeast -dissolve 30 -geometry +15%+15%  lhslogo.png input_file.jpg output_file.jpg
	cmd := exec.Command("composite", "-gravity", output_align, "-dissolve", "100", watermark_file, input_file, output_file)

	err := cmd.Run()

	if err != nil {
		return err
	} else {
		return nil
	}

}

func GetBanner(content string) (string, error) {
	if imgs, num := GetImages(content); num > 0 {

		for _, v := range imgs {
			// 只获取本地图片,外部图片不太可靠
			if IsLocal(v) {
				if Exist(Url2local(v)) {

					return v, nil
				}
			}
			return v, errors.New("GetBanner没有图片链接")
		}
	}
	return "", errors.New("GetBanner没有图片链接")
}

func GetBannerThumbnail(content string) (string, error) {
	//开始提取img
	if s, e := GetBanner(content); e == nil {

		//配置缩略图
		input_file := Url2local(s)
		output_file := Url2local(SetSuffix(s, "_banner.jpg"))
		output_size := "680x300"
		output_align := "center"
		background := "black"

		//处理缩略图
		if err := Thumbnail("crop", input_file, output_file, output_size, output_align, background); err == nil {

			return Local2url(output_file), err
		} else {

			fmt.Println("GetBannerThumbnail生成缩略图出错:", err)

			if e := os.Remove(output_file); e != nil {
				fmt.Println("GetBannerThumbnail清除残余缩略图文件出错:", e)
				return "", e
			}
			return "", err

		}
	} else {
		return "", e
	}
}

func GetThumbnails(content string) (thumbnails string, thumbnailslarge string, thumbnailsmedium string, thumbnailssmall string, err error) {
	/*
		Thumbnails        string //Original remote file
		ThumbnailsLarge   string //200x300
		ThumbnailsMedium  string //200x150
		ThumbnailsSmall   string //70x70
	*/

	//开始提取img 默认所有图片为本地文件
	if original_file, e := GetBanner(content); e == nil {

		//配置缩略图
		input_file := Url2local(original_file)
		output_file_Large := Url2local(SetSuffix(original_file, "_large.jpg"))
		output_file_Medium := Url2local(SetSuffix(original_file, "_medium.jpg"))
		output_file_Small := Url2local(SetSuffix(original_file, "_small.jpg"))
		output_size_Large := "200x300"
		output_size_Medium := "200x150"
		output_size_Small := "70x70"
		output_align := "center"
		background := "#ffffff"

		//处理缩略图
		//原始文件
		thumbnails = original_file

		//大缩略图
		if err := Thumbnail("resize", input_file, output_file_Large, output_size_Large, output_align, background); err == nil {
			thumbnailslarge = Local2url(output_file_Large)
		} else {
			fmt.Println("GetThumbnails生成thumbnailslarge缩略图出错:", err)
			if e := os.Remove(output_file_Large); e != nil {
				fmt.Println("GetThumbnails清除残余thumbnailslarge缩略图文件出错:", e)
			}
		}

		//中缩略图
		if err := Thumbnail("resize", input_file, output_file_Medium, output_size_Medium, output_align, background); err == nil {
			thumbnailsmedium = Local2url(output_file_Medium)
		} else {

			fmt.Println("GetThumbnails生成output_file_Medium缩略图出错:", err)

			if e := os.Remove(output_file_Medium); e != nil {
				fmt.Println("GetThumbnails清除残余output_file_Medium缩略图文件出错:", e)

			}
		}

		//小缩略图
		if err := Thumbnail("resize", input_file, output_file_Small, output_size_Small, output_align, background); err == nil {

			thumbnailssmall = Local2url(output_file_Small)
		} else {

			fmt.Println("GetThumbnails生成output_file_Small缩略图出错:", err)

			if e := os.Remove(output_file_Small); e != nil {
				fmt.Println("GetThumbnails清除残余output_file_Small缩略图文件出错:", e)

			}
		}
		return thumbnails, thumbnailslarge, thumbnailsmedium, thumbnailssmall, nil
	} else {
		return "", "", "", "", e
	}
}

func MakeThumbnails(localpath string) (thumbnails string, thumbnailslarge string, thumbnailsmedium string, thumbnailssmall string, err error) {
	/*
		Thumbnails        string //Original remote file
		ThumbnailsLarge   string //200x300
		ThumbnailsMedium  string //200x150
		ThumbnailsSmall   string //70x70
	*/
	//开始提取img 默认所有图片为本地文件
	if original_file := Url2local(localpath); original_file != "" {

		// 配置缩略图
		input_file := Url2local(original_file)
		output_file_Large := Url2local(SetSuffix(original_file, "_large.jpg"))
		output_file_Medium := Url2local(SetSuffix(original_file, "_medium.jpg"))
		output_file_Small := Url2local(SetSuffix(original_file, "_small.jpg"))
		output_size_Large := "200x300"
		output_size_Medium := "200x150"
		output_size_Small := "70x70"
		output_align := "center"
		background := "#ffffff"

		//处理缩略图
		//原始文件 也缩略处理以适合内容框大小
		if err := Thumbnail("thumbnail", input_file, original_file, "696x", output_align, background); err == nil {
			watermark_file := "./theme/default/static/mzr/img/watermark.png"
			Watermark(watermark_file, original_file, original_file, "SouthEast")
			thumbnails = Local2url(original_file)
		} else {

			fmt.Println("MakeThumbnails生成thumbnails缩略图出错:", err)

			if e := os.Remove(original_file); e != nil {
				fmt.Println("MakeThumbnails清除残余thumbnails缩略图文件出错:", e)

			}
		}

		//大缩略图
		if err := Thumbnail("resize", input_file, output_file_Large, output_size_Large, output_align, background); err == nil {

			thumbnailslarge = Local2url(output_file_Large)
		} else {

			fmt.Println("MakeThumbnails生成thumbnailslarge缩略图出错:", err)

			if e := os.Remove(output_file_Large); e != nil {
				fmt.Println("MakeThumbnails清除残余thumbnailslarge缩略图文件出错:", e)

			}
		}

		//中缩略图
		if err := Thumbnail("resize", input_file, output_file_Medium, output_size_Medium, output_align, background); err == nil {

			thumbnailsmedium = Local2url(output_file_Medium)
		} else {

			fmt.Println("MakeThumbnails生成output_file_Medium缩略图出错:", err)

			if e := os.Remove(output_file_Medium); e != nil {
				fmt.Println("MakeThumbnails清除残余output_file_Medium缩略图文件出错:", e)

			}
		}

		//小缩略图
		if err := Thumbnail("resize", input_file, output_file_Small, output_size_Small, output_align, background); err == nil {

			thumbnailssmall = Local2url(output_file_Small)
		} else {

			fmt.Println("MakeThumbnails生成output_file_Small缩略图出错:", err)

			if e := os.Remove(output_file_Small); e != nil {
				fmt.Println("MakeThumbnails清除残余output_file_Small缩略图文件出错:", e)

			}
		}
		return thumbnails, thumbnailslarge, thumbnailsmedium, thumbnailssmall, nil
	} else {
		return "", "", "", "", errors.New("输入的图片路径为空!")
	}
}

//  返回 图片url列表集合
func GetImages(content string) (imgs []string, num int) {

	//替换HTML的空白字符为空格
	ren := regexp.MustCompile(`\s`) //ns*r
	bodystr := ren.ReplaceAllString(content, " ")

	//匹配所有图片
	//rem := regexp.MustCompile(`<img.*?src="(.+?)".*?`) //匹配最前面的图
	rem := regexp.MustCompile(`<img.+?src="(.+?)".*?`) //匹配最前面的图
	img_urls := rem.FindAllSubmatch([]byte(bodystr), -1)

	for _, bv := range img_urls {
		if m := string(bv[1]); m != "" {

			if !ContainsSets(imgs, m) {
				imgs = append(imgs, m)
			}
		}
	}

	return imgs, len(imgs)
}

//指纹比较
func PhaCompare(path1 string, path2 string) (int, error) {

	if fg1, err := GetImagePha(path1); err != nil {
		return -1, err
	} else {
		if fg2, err := GetImagePha(path2); err != nil {
			return -1, err
		} else {

			return CompareDiff(fg1, fg2), err
		}
	}

}

func DelLostImages(oldz string, newz string) {

	oldfiles, onum := GetImages(oldz)
	newfiles, nnum := GetImages(newz)

	//初步过滤门槛,提高效率,因为下面的操作太多循环,能避免进入则避免
	if (onum > 0 && nnum > 0) || (onum > 0 && nnum < 1) || (onum == nnum) {

		oldfiles_local := []string{}
		newfiles_local := []string{}

		for _, v := range oldfiles {
			if IsLocal(v) {
				oldfiles_local = append(oldfiles_local, v)
				//如果本地同时也存在banner缓存文件,则加入旧图集合中,等待后面一次性删除
				if p := Url2local(SetSuffix(v, "_banner.jpg")); Exist(p) {
					oldfiles_local = append(oldfiles_local, p)
				}
			}
		}
		//fmt.Println("旧图集合:", oldfiles_local)

		for _, v := range newfiles {
			if IsLocal(v) {
				newfiles_local = append(newfiles_local, v)
			}
		}
		//fmt.Println("新图集合:", newfiles_local)

		//旧图集合-新图集合 =待删图集
		for k, v := range DifferenceSets(oldfiles_local, newfiles_local) {
			if p := Url2local(v); Exist(p) { //如若文件存在,则处理,否则忽略
				fmt.Println("删除文件:", p)
				if err := os.Remove(p); err != nil {
					fmt.Println("#", k, ",DEL FILE ERROR:", err)
				}
			}
		}
	}

}

// 根据用户邮箱显示Gravatar头像
func Gravatar(email string, height int) string {
	if email != "" && height != 0 {
		// 将邮箱转换成MD5哈希值，并设置图像的大小为height像素
		usergravatar := `http://www.gravatar.com/avatar/` + MD5(email) + `?s=` + strconv.Itoa(height)
		return usergravatar
	} else {
		return ""
	}
}

//PHA算法  获取图像指纹
func GetImagePha(path string) (string, error) {

	if infile, err := os.Open(path); err != nil {
		return "", err
	} else {

		// Decode picture.
		if srcImg, _, err := image.Decode(infile); err != nil {
			fmt.Println("Decode picture:", err)
		} else {

			return PHA(srcImg), err

		}

	}
	return "", errors.New("获取图片PHA值出现错误")

}
