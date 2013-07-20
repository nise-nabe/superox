<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Super OX Game</title>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('superox.css'); ?>
	<?php echo Asset::js('jquery-2.0.3.min.js'); ?>
	<?php echo Asset::js('superox.js'); ?>
</script>
</head>
<body>
	<div id="header">
	</div>
	<div class="container">
		<div class="hero-unit">
		</div>
		<div class="row">
			<div class="span12">
<?php echo $stage ?>
			</div>
		</div>
		<footer>
		</footer>
	</div>
</body>
</html>
