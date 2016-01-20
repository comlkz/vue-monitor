<script>
    import DateFormat from '../util/DateFormat.js'
	Vue.filter('date', function (value,format) {
	  return DateFormat.format(new Date(value),format)
	})
</script>