define([
		'contextualContentEditor/js/3rdparty/jquery/shim',
		'contextualContentEditor/js/3rdparty/mustache/mustache',
		'contextualContentEditor/configuration'
	],function(
		$,
		mustache,
		config
	){
		var contextualContentEditor = function(){
			this.init();
			return this;
		}
		contextualContentEditor.prototype = {
			'defaults':{
				'selector': ':input[data-editor-type=cce-contextual]',
				'onInitCreate': true,
				'html': {
					'editorWrapper': '<div class="{{className.editorWrapper}}">',
					'editorEnhaced': '<div class="{{className.editor}}">{{{html.defaultBlockElement}}}</div>',
					'defaultBlockElement': '<p/>',
					'defaultInlineBlockElement': '<span/>'
				},
				'className': {
					'originalInput': 'originalInput',
					'editorWrapper': 'editorWrapper',
					'editor': 'editor'
				},
				'keyMap': {
					'8': { // [DELETE]
						'default': 'delete'
					},
					'13': { // [ENTER]
						'default': 'newBlockElement',
						'shift': 'lineBreak'
					},
					'40': { // [DOWN]
						'default': 'navigateNext'
					},
					'38': { // [UP]
						'default': 'navigatePrevious'
					},
					'49': { // [1]
						'ctrl': 'changeTagTypeH1'
					},
					'50': { // [2]
						'ctrl': 'changeTagTypeH2'
					},
					'51': { // [3]
						'ctrl': 'changeTagTypeH3'
					},
					'52': { // [4]
						'ctrl': 'changeTagTypeH4'
					},
					'53': { // [5]
						'ctrl': 'changeTagTypeH5'
					},
					'54': { // [6]
						'ctrl': 'changeTagTypeH6'
					},
					'69': { // [E]
						'shift|ctrl': 'newInlineElementStrongEmphasis',
						'ctrl': 'newInlineElementEmphasis'
					},
					'83': { // []
						'ctrl': 'newInlineElement'
					}
				}
			},
			'init': function(){
				var module = this;
				module.config = $.extend({},module.defaults,config);
				if(module.config.onInitCreate) module.create();
			},
			'create': function(){
				var module = this;
				module.$input = $(module.config.selector)
				module.inputsEnhance();
			},
			'inputsEnhance': function(){
				var module = this;
				module.$wrapper = module.$input.wrap(mustache.render(module.config.html.editorWrapper,module.config)).closest('.'+module.config.className.editorWrapper),
				module.$editor = module.$wrapper.append(mustache.render(module.config.html.editorEnhaced,module.config)).find('.'+module.config.className.editor);
				module.$editor.on('keydown',function(e){
					module.onKeyDown(e);
				});
				module.$editor.on('input',function(e){
					module.onInput(e);
				});
				module.$wrapper.height(module.$input.height());
				//module.$wrapper.width(module.$input.width());
				module.$input.addClass(module.config.className.originalInput);
				module.syncInput();
			},
			'onKeyDown': function(e){
				console.log(e);
				var module = this,
					method = false,
					keyConfig = module.config.keyMap[e.keyCode],
					keyModifiers = [];

				if(typeof keyConfig == 'object'){
					if(e.shiftKey) keyModifiers.push('shift');
					if(e.ctrlKey) keyModifiers.push('ctrl');
					if(e.altKey) keyModifiers.push('alt');

					keyModifierKey = keyModifiers.join('|')
					method = (keyModifierKey != '')? keyModifierKey : 'default';
				}
				//
				if(method && keyConfig[method] && typeof module.modifier[keyConfig[method]] == 'function') module.modifier[keyConfig[method]].call(module,e);
			},
			'onInput': function(e){
				var module = this;
				module.syncInput();
			},
			'syncInput': function(){
				var module = this;
				module.$input.html(module.$editor.html());
			},
			'syncEditor': function(){
				var module = this;
				module.$editor.html(module.$input.html());
			},
			'inputsRestore': function(){

			},
			'destroy': function(){},
			'modifier': {
				'newBlockElement': function(e){
					console.log('newParagraph');
					var module = this,
						$srcElement = $(e.srcElement),
						$newElement = $(module.config.html.defaultBlockElement);

					$srcElement.after($newElement);
					$newElement.focus();

					e.preventDefault();
				},
				'lineBreak': function(e){
					//e.preventDefault();
				},
				'delete': function(e){
					console.log('delete');
					var $srcElement = $(e.srcElement);
					console.log(!$srcElement.is(':only-child'));
					if( 
						!$srcElement.is(':only-child') && (new RegExp('^(<br\/?>)?$')).test($srcElement.html())
					){
						if($srcElement.is(':first-child')) $srcElement.next().focus();
						else $srcElement.prev().focus();
						$srcElement.remove();
						e.preventDefault();
					}

				},
				'changeTagType': function(e,tag){
					console.log('changeTagType');
					var module = this,
						$srcElement = $(e.srcElement),
						content = $srcElement.html(),
						$tag = (typeof tag == 'string')? $(tag) : $(module.config.html.defaultBlockElement) ;

					console.log($srcElement.replaceWith($tag));
					$tag.html(content).focus();
					e.preventDefault();
				},
				'changeTagTypeH1': function(e){
					var module = this;

					module.modifier.changeTagType(e,'<h1/>');
				},
				'changeTagTypeH2': function(e){
					var module = this;

					module.modifier.changeTagType(e,'<h2/>');
				},
				'changeTagTypeH3': function(e){
					var module = this;

					module.modifier.changeTagType(e,'<h3/>');
				},
				'changeTagTypeH4': function(e){
					var module = this;

					module.modifier.changeTagType(e,'<h4/>');
				},
				'changeTagTypeH5': function(e){
					var module = this;

					module.modifier.changeTagType(e,'<h5/>');
				},
				'changeTagTypeH6': function(e){
					var module = this;

					module.modifier.changeTagType(e,'<h6/>');
				},
				'navigateNext': function(e){
					var module = this,
						cursorSelection = window.getSelection(),
						cursorSelectionRange = cursorSelection.getRangeAt(0),
						$srcElement = $(e.srcElement);

					if(
						cursorSelectionRange.startOffset == cursorSelectionRange.endOffset // If a range isn't selected
						&& cursorSelectionRange.startOffset == $srcElement.text().length // If the cursor is at the end of the editable element
					){
						$srcElement.next().focus();					
					}
				},
				'navigatePrevious': function(e){
					var module = this,
						cursorSelection = window.getSelection(),
						cursorSelectionRange  = cursorSelection.getRangeAt(0),
						$srcElement = $(e.srcElement);

					if(
						cursorSelectionRange.startOffset == cursorSelectionRange.endOffset // If a range isn't selected
						&& cursorSelectionRange.startOffset == 0 // If the cursoer is at the begining of the editable element
					){
						$srcElement.prev().focus();					
					}
				},
				'navigateUp': function(e){
					var module = this;
				},
				'navigateDown': function(e){
					var module = this;
				},
				'newInlineElement': function(e,tag){
					var module = this,
						cursorSelection = window.getSelection(),
						cursorSelectionRange = cursorSelection.getRangeAt(0),
						$cursorSelectionParentNode = $(cursorSelection.anchorNode.parentNode),
						content = $cursorSelectionParentNode.html(),
						tag = (typeof tag == 'string')? tag : module.config.html.defaultInlineBlockElement,
						newContent = content.substring(0,cursorSelectionRange.startOffset)
						+(tag.replace('/',''))
						+content.substring(cursorSelectionRange.startOffset,cursorSelectionRange.endOffset)
						+(tag.replace('/','').replace('<','</'))
						+content.substring(cursorSelectionRange.endOffset,content.length);

					$cursorSelectionParentNode.html(newContent);
					e.preventDefault();
				},
				'newInlineElementStrongEmphasis': function(e){
					var module = this;

					module.modifier.newInlineElement(e,'<strong/>');
				},
				'newInlineElementEmphasis': function(e){
					var module = this;

					module.modifier.newInlineElement(e,'<em/>');
				}
			}
		};
		return new contextualContentEditor();
});