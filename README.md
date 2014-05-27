## exportTableAsCSV
================

This is a Prototype (http://prototypejs.org/) extension to export an HTML table as CSV and directly sends it to the browser.

## Usage

The usage is pretty simple as it extends the Element Object by one method: exportTableAsCSV

```js
  $('table-id').exportTableAsCSV();
```

```js
  $('table-id').exportTableAsCSV({
  	header: [
		'my', 'custom', 'header', 'instead', 'of', 'the', 'regular', 'th', 'header'
	]
  });
```

```js
  $('table-id').exportTableAsCSV({
  	separator: ';' // use ; instead of , for separating
  });
```