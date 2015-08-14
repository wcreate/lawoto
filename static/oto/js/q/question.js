$('#editor-content').mdeditor({
    output: 'markdown',
    language: 'en-US',
    width: '100%',
    height: '400px',
    specialBar: true,
    formControl: false,
    codeIcon: true,
    mailIcon: true,
    phoneIcon: true,
    headerIcon: true,
    helpIcon: true,
    preview: true,
    attachment: true,
    wordCounter: true,
    includeTipsy: true,
    syntaxHighlighting: true,
    wordWrap: true,
    theme: false,
    tabs: true,
    lineBreaks: true,
    attachmentDir: 'attachment/',
    footer: 'version',
    maxUpload: 2000000,
    notUpload: [
        'php',
        'py',
        'rb',
        'pl'
    ]
});