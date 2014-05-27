/**
 * CSV Table Exporter.
 *
 * Note that this library is based on Prototype.
 *
 * Usage $('table-id').exportTableAsCSV();
 *
 * @author    Dennis Stuecken <dstuecken@i-doit.de>
 * @copyright Dennis Stuecken <dstuecken@i-doit.de>
 * @licence   MIT
 *
 * This library is freely distributable under the same terms as Prototype.
 *
 * You may need to implement the following directives

 if (!('IE8' in  Prototype.Browser)) {
  Prototype.Browser.IEVersion = parseFloat(navigator.appVersion.split(';')[1].strip().split(' ')[1]);
  Prototype.Browser.IE6 =  Prototype.Browser.IEVersion == 6;
  Prototype.Browser.IE7 =  Prototype.Browser.IEVersion == 7;
  Prototype.Browser.IE8 =  Prototype.Browser.IEVersion == 8;
}
 */
;
(function () {

    var defaultOptions = {
        separator: ',',
        linefeed:  '\r\n',
        header:    []
    };

    var elementMatchers = {
        'HTMLElements': /^(?:TABLE)$/
    };

    Element.addMethods({exportTableAsCSV: function (element, options) {
        element = $(element);

        options = Object.extend(defaultOptions, options || {});

        options.separator = '"' + options.separator + '"';
        options.linefeed  = '"' + options.linefeed + '"';

        if (elementMatchers['HTMLElements'].test(element.tagName)) {
            var tmpSeparator = String.fromCharCode(11), // vertical tab character
                tmpLinefeed = String.fromCharCode(0),   // null character
                csvData = '', headerSelector = '';

            if (options.header.length > 0)
                csvData = options.header.join(options.separator) + options.linefeed;
            else
                headerSelector = 'tr:has(th),';

            csvData += '"' + element.select(headerSelector + 'tr:has(td)').collect(function (row, i) {
                return row.select('th,td').collect(function (col, j) {
                    var text = col.down("a") && col.down("a").length > 0 ? col.down("a")[0].innerHTML : col.innerHTML; // extract data from td content
                    return text.replace(/°/g, " ").replace(/"/g, '""').stripTags().unescapeHTML(); // escape and replace
                }).join(tmpSeparator);
            }).join(options.linefeed)

                .split(tmpLinefeed).join(options.linefeed)
                .split(tmpSeparator).join(options.separator) + '"';

            if (Prototype.Browser.IE6 || Prototype.Browser.IE7 || Prototype.Browser.IE8) {
                var popup = window.open('', 'csv', '');
                popup.document.body.innerHTML = '<pre>' + csvData + '</pre>';
            }
            else window.location = 'data:text/csv,' + encodeURIComponent(csvData);
        }

        return csvData;
    }});

})();