const path = require('path');
var https = require('https');
var xml2js = require('xml2js');
const csvWriter = require('csv-writer');

const fileUrl = 'https://www.lepoint.fr/politique/rss.xml';
const maxDescriptionLength = 65;

var parser = new xml2js.Parser();

parser.on('error', function (err) { console.log('Parser error', err); });


function xmlToJson(url, callback) {
    var req = https.get(url, function (res) {
        var xml = '';

        res.on('data', function (chunk) {
            xml += chunk;
        });

        res.on('error', function (e) {
            callback(e, null);
        });

        res.on('timeout', function (e) {
            callback(e, null);
        });

        res.on('end', function () {
            parser.parseString(xml, function (err, result) {
                callback(null, result);
            });
        });
    });
}

function getArticleId(url) {
    var lastPointIndex = url.lastIndexOf('.');
    var splitString = url.slice(0, lastPointIndex);
    var lastDashIndex = splitString.lastIndexOf('-');

    var result = splitString.slice(lastDashIndex + 1);

    return (result);
}

function getTruncatedDescription(description) {
    if (description.length <= maxDescriptionLength)
        return description;

    var cuttedString = description.slice(0, maxDescriptionLength);

    return cuttedString.slice(0, cuttedString.lastIndexOf(' ')) + '...';
}

function getArticleImageUrl(enclosure) {
    return enclosure[0]['$'].url;
}

function getArticleImageSize(enclosure) {
    return Number((enclosure[0]['$'].length / 1000).toFixed(1));
}

function generateData(items) {
    var result = [];

    items.forEach(item => {
        var newElement = {
            'id': getArticleId(item.guid[0]),
            'title': item.title[0],
            'description': getTruncatedDescription(item.description[0]),
            'articleUrl': item.link[0],
            'imageUrl': getArticleImageUrl(item.enclosure),
            'imageSize': getArticleImageSize(item.enclosure)
        };

        result.push(newElement);
    });

    return result;
}

function generateCsv(generatedItems) {
    const writer = csvWriter.createObjectCsvWriter({
        path: path.resolve(__dirname, 'LePointArticles.csv'),
        header: [
            { id: 'id', title: 'Id' },
            { id: 'title', title: 'Title' },
            { id: 'description', title: 'Description' },
            { id: 'articleUrl', title: 'Article URL' },
            { id: 'imageUrl', title: 'Image URL' },
            { id: 'imageSize', title: 'Image Size (Ko)' },
        ],
        encoding: 'utf8',
        fieldDelimiter: ',',
        recordDelimiter: '\n'
    });

    writer.writeRecords(generatedItems).then(() => {
        console.log('Done!');
    });
}

xmlToJson(fileUrl, function (err, data) {
    if (err)
        return console.err(err);

    var items = data.rss.channel[0].item;

    var generatedItems = generateData(items);

    generateCsv(generatedItems);
});

