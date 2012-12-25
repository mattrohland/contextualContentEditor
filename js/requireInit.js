(function(){
	require.config({
		'baseUrl': '../',
		'paths': {
			'contextualContentEditor':'.'
		},
		'urlArgs': 'bust='+(new Date()).getTime()
	});
})();