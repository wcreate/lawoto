<div class='MDEditor_body_actioncontainer_content_attachment'>
	<h2 data-element='MDEditor_%ELEMENTNAME%_source_attachment_headline'></h2>

	<hr />

	<div data-element='MDEditor_%ELEMENTNAME%_source_attachment_fileupload_error' style='display: <?php echo $errorDisplay; ?>;'><?php echo $errorMsg; ?></div>

	<div style='text-align: left;'>
		<a data-element='MDEditor_%ELEMENTNAME%_source_attachment_content_button_upload' class='btn btn-primary btn-sm'>
			<i class='fa fa-upload'></i> <span data-element='MDEditor_%ELEMENTNAME%_source_attachment_content_button_upload_span'></span>
		</a>

		<a data-element='MDEditor_%ELEMENTNAME%_source_attachment_content_button_createdir' class='btn btn-success btn-sm'>
			<i class='fa fa-folder-o'></i> <span data-element='MDEditor_%ELEMENTNAME%_source_attachment_content_button_createdir_span'></span>
		</a>

		<a data-element='MDEditor_%ELEMENTNAME%_source_attachment_content_button_deleteall' class='btn btn-danger btn-sm' style='display: none;'>
			<i class='fa fa-trash-o'></i> <span data-element='MDEditor_%ELEMENTNAME%_source_attachment_content_button_deleteall_span'></span>
		</a>

		<a data-element='MDEditor_%ELEMENTNAME%_source_attachment_content_button_rename' class='btn btn-warning btn-sm' style='display: none;'>
			<i class='fa fa-pencil'></i> <span data-element='MDEditor_%ELEMENTNAME%_source_attachment_content_button_rename_span'></span>
		</a>
	</div>

	<div data-element='MDEditor_%ELEMENTNAME%_source_attachment_fileupload_container' style='text-align: left; display: none;'>
		<br />
		<form data-element='MDEditor_%ELEMENTNAME%_source_attachment_fileupload_form'>
			<b data-element='MDEditor_%ELEMENTNAME%_source_attachment_fileupload'></b><b>: </b><input data-element='MDEditor_%ELEMENTNAME%_source_attachment_fileupload_input' name='MDEditor_fileupload' type='file' style='display: inline;' />
		</form>
	</div>

	<hr />
	
	
</div>
<script type='text/javascript' language='javascript'>
	$("[data-element]").each(function () {
		$(this).mdeditorCreateElementID();
	});

	var elementName;
	var language;
	elementName = mdeditor.elementName;
	language = mdeditor.lang;

	function mdeditorReload (action, source) {
		if (action == 'upload') {
			var file;
			var filename;
			var filesize;
			var filetype;
			file = source.files[0];
			filename = file.name;
			filesize = file.size;
			filetype = file.type;

			var language;
			language = mdeditor.lang;

			if (filesize > mdeditor.maxUpload) {
				$('#MDEditor_' + mdeditor.elementName + '_source_attachment_fileupload_error').html('<div class="alert alert-danger"><i class="fa fa-warning"></i> ' + language.message.attachment.error.max + '</div>').fadeIn();
				return;
			}

			var filenameArray;
			var fileExtension;
			filenameArray = filename.split('.');
			fileExtension = filenameArray[filenameArray.length-1];

			for (var i = 0; i < mdeditor.notUpload.length; i++) {
				if (fileExtension == mdeditor.notUpload[i]) {
					$('#MDEditor_' + mdeditor.elementName + '_source_attachment_fileupload_error').html('<div class="alert alert-danger"><i class="fa fa-warning"></i> ' + language.message.attachment.error.not + '</div>').fadeIn();
					return;
				}
			}

			var formData = new FormData($('#MDEditor_' + mdeditor.elementName + '_source_attachment_fileupload_form')[0]);

			$('#MDEditor_' + elementName + '_body_actioncontainer_content').empty().css('vertical-align', 'middle').html("<img class='MDEditor_ajaxloader' src='" + mdeditor.url + "img/ajax.gif' alt='AJAX load' />");
			$('#MDEditor_' + elementName + '_body_actioncontainer').fadeIn(200);
			$('#MDEditor_' + elementName + '_body_optioncontainer').fadeOut(200, function () {
				$('#MDEditor_' + elementName + '_body_optioncontainer_content').empty().css('vertical-align', 'top');
			});

			$.ajax({
				type: 'POST',
				url: mdeditor.url + 'core/source/attachment.php?path=' + mdeditor.url + '&staticAttachmentDir=' + '<?php echo $_GET["staticAttachmentDir"]; ?>' + '&attachmentDir=' + '<?php echo $_GET["attachmentDir"]; ?>' + '&lang=' + mdeditor.language + '&action=upload',
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
				success: function (returnData) {
					$('#MDEditor_' + elementName + '_body_actioncontainer_content').fadeOut(80, function () {
						$('#MDEditor_' + elementName + '_body_actioncontainer_content').empty().css('vertical-align', 'top').html(returnData).fadeIn(80);
					});
				},
				error: function () {
					$('#MDEditor_' + elementName + '_body_actioncontainer_content').fadeOut(80, function () {
						$('#MDEditor_' + elementName + '_body_actioncontainer_content').empty().css('vertical-align', 'top').html('<div class="MDEditor_body_actioncontainer_content_error"><div class="alert alert-danger"><i class="fa fa-warning"></i> ' + language.message.error + '</div></div>').fadeIn(80);
					});
				}
			});
		}

		if (action == 'createdir') {
			var language;
			language = mdeditor.lang;

			$.ajax({
				type: 'GET',
				url: mdeditor.url + 'core/source/attachment.php?path=' + mdeditor.url + '&staticAttachmentDir=' + '<?php echo $_GET["staticAttachmentDir"]; ?>' + '&attachmentDir=' + '<?php echo $_GET["attachmentDir"]; ?>' + '&lang=' + mdeditor.language + '&action=createdir',
				data: {
					"dirname": source
				},
				success: function (returnData) {
					$('#MDEditor_' + elementName + '_body_actioncontainer_content').fadeOut(80, function () {
						$('#MDEditor_' + elementName + '_body_actioncontainer_content').empty().css('vertical-align', 'top').html(returnData).fadeIn(80);
					});
				},
				error: function () {
					$('#MDEditor_' + elementName + '_body_actioncontainer_content').fadeOut(80, function () {
						$('#MDEditor_' + elementName + '_body_actioncontainer_content').empty().css('vertical-align', 'top').html('<div class="MDEditor_body_actioncontainer_content_error"><div class="alert alert-danger"><i class="fa fa-warning"></i> ' + language.message.error + '</div></div>').fadeIn(80);
					});
				}
			});
		}

		if (action == 'rename') {
			var language;
			language = mdeditor.lang;

			$.ajax({
				type: 'GET',
				url: mdeditor.url + 'core/source/attachment.php?path=' + mdeditor.url + '&staticAttachmentDir=' + '<?php echo $_GET["staticAttachmentDir"]; ?>' + '&attachmentDir=' + '<?php echo $_GET["attachmentDir"]; ?>' + '&lang=' + mdeditor.language + '&action=rename',
				data: {
					"old": source.old,
					"new": source.new
				},
				success: function (returnData) {
					$('#MDEditor_' + elementName + '_body_actioncontainer_content').fadeOut(80, function () {
						$('#MDEditor_' + elementName + '_body_actioncontainer_content').empty().css('vertical-align', 'top').html(returnData).fadeIn(80);
					});
				},
				error: function () {
					$('#MDEditor_' + elementName + '_body_actioncontainer_content').fadeOut(80, function () {
						$('#MDEditor_' + elementName + '_body_actioncontainer_content').empty().css('vertical-align', 'top').html('<div class="MDEditor_body_actioncontainer_content_error"><div class="alert alert-danger"><i class="fa fa-warning"></i> ' + language.message.error + '</div></div>').fadeIn(80);
					});
				}
			});
		}

		if (action == 'delete') {
			var markedFiles;
			markedFiles = '';

			$('[data-marked="true"]').each(function () {
				markedFiles += "&file[]=" + $(this).attr('data-file');
			});

			$('#MDEditor_' + elementName + '_body_actioncontainer_content').empty().css('vertical-align', 'middle').html("<img class='MDEditor_ajaxloader' src='" + mdeditor.url + "img/ajax.gif' alt='AJAX load' />");
			$('#MDEditor_' + elementName + '_body_actioncontainer').fadeIn(200);
			$('#MDEditor_' + elementName + '_body_optioncontainer').fadeOut(200, function () {
				$('#MDEditor_' + elementName + '_body_optioncontainer_content').empty().css('vertical-align', 'top');
			});

			var language;
			language = mdeditor.lang;

			$.ajax({
				type: 'GET',
				url: mdeditor.url + 'core/source/attachment.php?path=' + mdeditor.url + '&staticAttachmentDir=' + '<?php echo $_GET["staticAttachmentDir"]; ?>' + '&attachmentDir=' + '<?php echo $_GET["attachmentDir"]; ?>' + '&lang=' + mdeditor.language + '&action=delete' + markedFiles,
				data: 'returnData',
				success: function (returnData) {
					$('#MDEditor_' + elementName + '_body_actioncontainer_content').fadeOut(80, function () {
						$('#MDEditor_' + elementName + '_body_actioncontainer_content').empty().css('vertical-align', 'top').html(returnData).fadeIn(80);
					});
				},
				error: function () {
					$('#MDEditor_' + elementName + '_body_actioncontainer_content').fadeOut(80, function () {
						$('#MDEditor_' + elementName + '_body_actioncontainer_content').empty().css('vertical-align', 'top').html('<div class="MDEditor_body_actioncontainer_content_error"><div class="alert alert-danger"><i class="fa fa-warning"></i> ' + language.message.error + '</div></div>').fadeIn(80);
					});
				}
			});
		}
	}

	function mdeditorInsert (number) {
		if ($('#MDEditor_attachment_' + number).attr('data-insertType') == 'image') {
			$('#MDEditor_' + elementName + '_body_edit_textarea').textrange('insert', "![" + $('#MDEditor_attachment_' + number).attr('data-filename') + "](" + $('#MDEditor_attachment_' + number).attr('data-file') + ")");
			$('#MDEditor_' + elementName + '_body_edit_textarea').textrange('set', $('#MDEditor_' + elementName + '_body_edit_textarea').textrange().end, 0);

			$('.tipsy').css('display', 'none');

			$('#MDEditor_' + elementName + '_body_actioncontainer').fadeOut(200, function () {
				$('#MDEditor_' + elementName + '_body_actioncontainer_content').empty().css('vertical-align', 'top');
			});
		}

		if ($('#MDEditor_attachment_' + number).attr('data-insertType') == 'link') {
			$('#MDEditor_' + elementName + '_body_edit_textarea').textrange('insert', "[" + $('#MDEditor_attachment_' + number).attr('data-filename') + "](" + $('#MDEditor_attachment_' + number).attr('data-file') + ")");
			$('#MDEditor_' + elementName + '_body_edit_textarea').textrange('set', $('#MDEditor_' + elementName + '_body_edit_textarea').textrange().end, 0);

			$('.tipsy').css('display', 'none');

			$('#MDEditor_' + elementName + '_body_actioncontainer').fadeOut(200, function () {
				$('#MDEditor_' + elementName + '_body_actioncontainer_content').empty().css('vertical-align', 'top');
			});
		}
	}

	$('[data-marked]').off();
	$('[data-marked]').mousedown(function (e) {
		if (e.which == 3) {
			var marked;
			var number;
			marked = $(this).attr('data-marked');
			number = $(this).attr('data-number');

			if (marked == 'false') {
				$(this).attr('data-marked', 'true');
				$(this).css('border-color', '#ff9500');
				$('#MDEditor_attachment_' + number).addClass('MDEditor_addition');
				$('#MDEditor_attachment_' + number).addClass('MDEditor_addition');
			}

			if (marked == 'true') {
				$(this).attr('data-marked', 'false');
				$(this).css('border-color', '#f5f5f5');
				$('#MDEditor_attachment_' + number).removeClass('MDEditor_addition');
				$('#MDEditor_attachment_' + number).removeClass('MDEditor_addition');
			}

			var markedCount;
			markedCount = $('[data-marked="true"]').length;

			if (markedCount > 0) {
				$('#MDEditor_' + mdeditor.elementName + '_source_attachment_content_button_deleteall').fadeIn(200);
			} else {
				$('#MDEditor_' + mdeditor.elementName + '_source_attachment_content_button_deleteall').fadeOut(200);
			}

			if (markedCount == 1) {
				$('#MDEditor_' + mdeditor.elementName + '_source_attachment_content_button_rename').fadeIn(200);
			} else {
				$('#MDEditor_' + mdeditor.elementName + '_source_attachment_content_button_rename').fadeOut(200);
			}
		}
	}).bind('contextmenu', function (e) {
		return false;
	});

	$('#MDEditor_' + elementName + '_source_attachment_headline').html(language.source.label.attachment.title);
	$('#MDEditor_' + elementName + '_source_attachment_fileupload').html(language.source.label.attachment.fileupload);
	$('#MDEditor_' + elementName + '_source_attachment_content_directories').html(language.source.label.attachment.directories);
	$('#MDEditor_' + elementName + '_source_attachment_content_images').html(language.source.label.attachment.images);
	$('#MDEditor_' + elementName + '_source_attachment_content_audio').html(language.source.label.attachment.audio);
	$('#MDEditor_' + elementName + '_source_attachment_content_videos').html(language.source.label.attachment.videos);
	$('#MDEditor_' + elementName + '_source_attachment_content_word').html(language.source.label.attachment.word);
	$('#MDEditor_' + elementName + '_source_attachment_content_excel').html(language.source.label.attachment.excel);
	$('#MDEditor_' + elementName + '_source_attachment_content_powerpoint').html(language.source.label.attachment.powerpoint);
	$('#MDEditor_' + elementName + '_source_attachment_content_pdf').html(language.source.label.attachment.pdf);
	$('#MDEditor_' + elementName + '_source_attachment_content_archives').html(language.source.label.attachment.archives);
	$('#MDEditor_' + elementName + '_source_attachment_content_code').html(language.source.label.attachment.code);
	$('#MDEditor_' + elementName + '_source_attachment_content_other').html(language.source.label.attachment.other);
	$('#MDEditor_' + elementName + '_source_attachment_content_empty').html(language.source.label.attachment.empty);
	$('#MDEditor_' + elementName + '_source_attachment_content_button_upload_span').html(language.source.label.attachment.upload);
	$('#MDEditor_' + elementName + '_source_attachment_content_button_createdir_span').html(language.source.label.attachment.createdir);
	$('#MDEditor_' + elementName + '_source_attachment_content_button_rename_span').html(language.source.label.attachment.rename);
	$('#MDEditor_' + elementName + '_source_attachment_content_button_deleteall_span').html(language.source.label.attachment.deleteall);

	$('#MDEditor_' + mdeditor.elementName + '_source_attachment_content_button_upload').click(function () {
		$('#MDEditor_' + mdeditor.elementName + '_source_attachment_fileupload_container').fadeIn();
	});

	$('#MDEditor_' + mdeditor.elementName + '_source_attachment_fileupload_input').off();
	$('#MDEditor_' + mdeditor.elementName + '_source_attachment_fileupload_input:file').change(function () {
		mdeditorReload('upload', this);
	});
	$('#MDEditor_' + mdeditor.elementName + '_source_attachment_content_button_createdir').click(function () {
		var dirname;
		dirname = prompt(language.message.attachment.createdir.text + ':', language.message.attachment.createdir.default);

		if (dirname != null) {
			mdeditorReload('createdir', dirname);
		}
	});
	$('#MDEditor_' + mdeditor.elementName + '_source_attachment_content_button_rename').click(function () {
		var filename;
		filename = prompt(language.message.attachment.rename + ':', $('[data-marked="true"]').attr('data-filename'));

		if (filename != null) {
			mdeditorReload('rename', {
				"old": $('[data-marked="true"]').attr('data-filename'),
				"new": filename
			});
		}
	});
	$('#MDEditor_' + mdeditor.elementName + '_source_attachment_content_button_deleteall').click(function () {
		mdeditorReload('delete');
	});

	$(document).ready(function () {
		$('.tipN').tipsy({
			title: 'title',
			trigger: 'hover',
			html: true,
			gravity: 's'
		});

		$('.tipNDelay').tipsy({
			title: 'title',
			trigger: 'hover',
			html: true,
			gravity: 's',
			delayIn: 1000,
			fade: true
		});
	});
</script>
