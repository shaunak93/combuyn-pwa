const scrape = require('website-scraper');

scrape({
    urls: ['http://nodejs.org/'],
    directory: '/bigbasketData.js',
    sources: [
      {selector: 'img', attr: 'src'},
      {selector: 'link[rel="stylesheet"]', attr: 'href'},
      {selector: 'script', attr: 'src'}
    ]
  });