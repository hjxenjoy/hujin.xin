const withSass = require('@zeit/next-sass')

module.exports = withSass({
  pageExtensions: ['tsx'],
  env: {
    GA_ID: 'UA-167052593-1',
    TITLE: '胡金鑫的个人网站',
    DESCRIPTION: '胡金鑫的个人网站，集中前端开发',
    KEYWORDS:
      '胡金鑫,个人博客,个人网站,hujin.xin,hjxenjoy,前端开发,JavaScript,css,html,React,Vue',
  },
})
