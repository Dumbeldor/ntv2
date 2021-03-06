/**
 * plugin.js
 *
 * Copyright, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*jshint maxlen:255 */
/*global tinymce:true */
if(typeof htmlspecialchars == 'undefined') {
      htmlspecialchars = function (text) {
            return text.replace(/[\u00A0-\u2666<>\&]/g, function(c) {
                return '&' + 
                (htmlspecialchars.entityTable[c.charCodeAt(0)] || '#'+c.charCodeAt(0)) + ';';
            });
      };

      // all HTML4 entities as defined here: http://www.w3.org/TR/html4/sgml/entities.html
      // added: amp, lt, gt, quot and apos
      htmlspecialchars.entityTable = {
            34 : 'quot', 
            38 : 'amp', 
            39 : 'apos', 
            60 : 'lt', 
            62 : 'gt', 
            160 : 'nbsp', 
            161 : 'iexcl', 
            162 : 'cent', 
            163 : 'pound', 
            164 : 'curren', 
            165 : 'yen', 
            166 : 'brvbar', 
            167 : 'sect', 
            168 : 'uml', 
            169 : 'copy', 
            170 : 'ordf', 
            171 : 'laquo', 
            172 : 'not', 
            173 : 'shy', 
            174 : 'reg', 
            175 : 'macr', 
            176 : 'deg', 
            177 : 'plusmn', 
            178 : 'sup2', 
            179 : 'sup3', 
            180 : 'acute', 
            181 : 'micro', 
            182 : 'para', 
            183 : 'middot', 
            184 : 'cedil', 
            185 : 'sup1', 
            186 : 'ordm', 
            187 : 'raquo', 
            188 : 'frac14', 
            189 : 'frac12', 
            190 : 'frac34', 
            191 : 'iquest', 
            192 : 'Agrave', 
            193 : 'Aacute', 
            194 : 'Acirc', 
            195 : 'Atilde', 
            196 : 'Auml', 
            197 : 'Aring', 
            198 : 'AElig', 
            199 : 'Ccedil', 
            200 : 'Egrave', 
            201 : 'Eacute', 
            202 : 'Ecirc', 
            203 : 'Euml', 
            204 : 'Igrave', 
            205 : 'Iacute', 
            206 : 'Icirc', 
            207 : 'Iuml', 
            208 : 'ETH', 
            209 : 'Ntilde', 
            210 : 'Ograve', 
            211 : 'Oacute', 
            212 : 'Ocirc', 
            213 : 'Otilde', 
            214 : 'Ouml', 
            215 : 'times', 
            216 : 'Oslash', 
            217 : 'Ugrave', 
            218 : 'Uacute', 
            219 : 'Ucirc', 
            220 : 'Uuml', 
            221 : 'Yacute', 
            222 : 'THORN', 
            223 : 'szlig', 
            224 : 'agrave', 
            225 : 'aacute', 
            226 : 'acirc', 
            227 : 'atilde', 
            228 : 'auml', 
            229 : 'aring', 
            230 : 'aelig', 
            231 : 'ccedil', 
            232 : 'egrave', 
            233 : 'eacute', 
            234 : 'ecirc', 
            235 : 'euml', 
            236 : 'igrave', 
            237 : 'iacute', 
            238 : 'icirc', 
            239 : 'iuml', 
            240 : 'eth', 
            241 : 'ntilde', 
            242 : 'ograve', 
            243 : 'oacute', 
            244 : 'ocirc', 
            245 : 'otilde', 
            246 : 'ouml', 
            247 : 'divide', 
            248 : 'oslash', 
            249 : 'ugrave', 
            250 : 'uacute', 
            251 : 'ucirc', 
            252 : 'uuml', 
            253 : 'yacute', 
            254 : 'thorn', 
            255 : 'yuml', 
            402 : 'fnof', 
            913 : 'Alpha', 
            914 : 'Beta', 
            915 : 'Gamma', 
            916 : 'Delta', 
            917 : 'Epsilon', 
            918 : 'Zeta', 
            919 : 'Eta', 
            920 : 'Theta', 
            921 : 'Iota', 
            922 : 'Kappa', 
            923 : 'Lambda', 
            924 : 'Mu', 
            925 : 'Nu', 
            926 : 'Xi', 
            927 : 'Omicron', 
            928 : 'Pi', 
            929 : 'Rho', 
            931 : 'Sigma', 
            932 : 'Tau', 
            933 : 'Upsilon', 
            934 : 'Phi', 
            935 : 'Chi', 
            936 : 'Psi', 
            937 : 'Omega', 
            945 : 'alpha', 
            946 : 'beta', 
            947 : 'gamma', 
            948 : 'delta', 
            949 : 'epsilon', 
            950 : 'zeta', 
            951 : 'eta', 
            952 : 'theta', 
            953 : 'iota', 
            954 : 'kappa', 
            955 : 'lambda', 
            956 : 'mu', 
            957 : 'nu', 
            958 : 'xi', 
            959 : 'omicron', 
            960 : 'pi', 
            961 : 'rho', 
            962 : 'sigmaf', 
            963 : 'sigma', 
            964 : 'tau', 
            965 : 'upsilon', 
            966 : 'phi', 
            967 : 'chi', 
            968 : 'psi', 
            969 : 'omega', 
            977 : 'thetasym', 
            978 : 'upsih', 
            982 : 'piv', 
            8226 : 'bull', 
            8230 : 'hellip', 
            8242 : 'prime', 
            8243 : 'Prime', 
            8254 : 'oline', 
            8260 : 'frasl', 
            8472 : 'weierp', 
            8465 : 'image', 
            8476 : 'real', 
            8482 : 'trade', 
            8501 : 'alefsym', 
            8592 : 'larr', 
            8593 : 'uarr', 
            8594 : 'rarr', 
            8595 : 'darr', 
            8596 : 'harr', 
            8629 : 'crarr', 
            8656 : 'lArr', 
            8657 : 'uArr', 
            8658 : 'rArr', 
            8659 : 'dArr', 
            8660 : 'hArr', 
            8704 : 'forall', 
            8706 : 'part', 
            8707 : 'exist', 
            8709 : 'empty', 
            8711 : 'nabla', 
            8712 : 'isin', 
            8713 : 'notin', 
            8715 : 'ni', 
            8719 : 'prod', 
            8721 : 'sum', 
            8722 : 'minus', 
            8727 : 'lowast', 
            8730 : 'radic', 
            8733 : 'prop', 
            8734 : 'infin', 
            8736 : 'ang', 
            8743 : 'and', 
            8744 : 'or', 
            8745 : 'cap', 
            8746 : 'cup', 
            8747 : 'int', 
            8756 : 'there4', 
            8764 : 'sim', 
            8773 : 'cong', 
            8776 : 'asymp', 
            8800 : 'ne', 
            8801 : 'equiv', 
            8804 : 'le', 
            8805 : 'ge', 
            8834 : 'sub', 
            8835 : 'sup', 
            8836 : 'nsub', 
            8838 : 'sube', 
            8839 : 'supe', 
            8853 : 'oplus', 
            8855 : 'otimes', 
            8869 : 'perp', 
            8901 : 'sdot', 
            8968 : 'lceil', 
            8969 : 'rceil', 
            8970 : 'lfloor', 
            8971 : 'rfloor', 
            9001 : 'lang', 
            9002 : 'rang', 
            9674 : 'loz', 
            9824 : 'spades', 
            9827 : 'clubs', 
            9829 : 'hearts', 
            9830 : 'diams', 
            338 : 'OElig', 
            339 : 'oelig', 
            352 : 'Scaron', 
            353 : 'scaron', 
            376 : 'Yuml', 
            710 : 'circ', 
            732 : 'tilde', 
            8194 : 'ensp', 
            8195 : 'emsp', 
            8201 : 'thinsp', 
            8204 : 'zwnj', 
            8205 : 'zwj', 
            8206 : 'lrm', 
            8207 : 'rlm', 
            8211 : 'ndash', 
            8212 : 'mdash', 
            8216 : 'lsquo', 
            8217 : 'rsquo', 
            8218 : 'sbquo', 
            8220 : 'ldquo', 
            8221 : 'rdquo', 
            8222 : 'bdquo', 
            8224 : 'dagger', 
            8225 : 'Dagger', 
            8240 : 'permil', 
            8249 : 'lsaquo', 
            8250 : 'rsaquo', 
            8364 : 'euro'
      };
}
function AutoEmbed() {

	AE_TAG = '<!-- Generated by AutoEmbed-JS (http://autoembed.com) -->';
	var self = this;
	self._media_id = null;
	self._stub = null;
	self._object_attribs = null;
	self._object_params = null;

	self.parseUrl = function (url) {
		var AutoEmbed_stubs = [
		  {
			'title' : 'YouTube',
			'website' : 'http://www.youtube.com',
			'url-match' : 'http://(?:video\.google\.(?:com|com\.au|co\.uk|de|es|fr|it|nl|pl|ca|cn)/(?:[^"]*?))?(?:(?:www|au|br|ca|es|fr|de|hk|ie|in|il|it|jp|kr|mx|nl|nz|pl|ru|tw|uk)\.)?youtube\.com(?:[^"]*?)?(?:&|&amp;|/|\\?|;|\%3F|\%2F)(?:video_id=|v(?:/|=|\%3D|\%2F))([0-9a-z-_]{11})',
			'embed-src' : 'http://www.youtube.com/v/$2?rel=0&fs=1&hd=1',
			'embed-width' : '480',
			'embed-height' : '295',
			'image-src' : 'http://img.youtube.com/vi/$2/0.jpg',
			'iframe-player' : 'http://www.youtube.com/embed/$2?rel=0',
		  },
		  {
			'title' : 'YouTube (Playlists)',
			'website' : 'http://www.youtube.com',
			'url-match' : 'http://(?:(?:www|au|br|ca|es|fr|de|hk|ie|in|il|it|jp|kr|mx|nl|nz|pl|ru|tw|uk)\.)?youtube\.com(?:[^"]*?)?(?:&|&amp;|/|\\?|;)(?:id=|p=|p/)([0-9a-f]{16})',
			'embed-src' : 'http://www.youtube.com/p/$2?rel=0&fs=1',
			'embed-width' : '480',
			'embed-height' : '385',
		  },
		  {
			'title' : 'Dailymotion',
			'website' : 'http://www.dailymotion.com',
			'url-match' : 'http://(?:www\.)?dailymotion\.(?:com|alice\.it)/(?:(?:[^"]*?)?video|swf)/([a-z0-9]{1,7})_([a-z0-9-]*)',
			'embed-src' : 'http://www.dailymotion.com/swf/$2?related=0',
			'embed-width' : '480',
			'embed-height' : '270',
			'image-src' : 'http://www.dailymotion.com/thumbnail/160x120/video/$2',
			'iframe-player' : 'http://www.dailymotion.com/embed/video/$2?hideInfos=1',
		  },
		  {
			'title' : 'Google Video',
			'website' : 'http://video.google.com',
			'url-match' : 'http://video\.google\.(com|com\.au|co\.uk|de|es|fr|it|nl|pl|ca|cn)/(?:videoplay|url|googleplayer\.swf)\\?(?:[^"]*?)?docid=([0-9a-z-_]{1,20})',
			'embed-src' : 'http://video.google.$2/googleplayer.swf?docId=$3',
			'embed-width' : '400',
			'embed-height' : '326',
		  },
		  {
			'title' : 'MegaVideo',
			'website' : 'http://www.megavideo.com',
			'url-match' : 'http://(?:www\.)?megavideo\.com/(?:\\?(?:[^"]*?)?v=|v/)([0-9a-z]{8})',
			'embed-src' : 'http://www.megavideo.com/v/$2.0.0',
			'embed-width' : '440',
			'embed-height' : '359',
		  },
		  {
			'title' : 'MetaCafe',
			'website' : 'http://www.metacafe.com',
			'url-match' : 'http://(?:www\.)?metacafe\.com/(?:watch|fplayer)/(\w{1,10})/',
			'embed-src' : 'http://www.metacafe.com/fplayer/$2/metacafe.swf',
			'embed-width' : '400',
			'embed-height' : '345',
		  },
		  {
			'title' : 'Revver',
			'website' : 'http://www.revver.com',
			'url-match' : 'http://(?:one\.|www\.)?revver\.com/(?:watch|video)/([0-9]{1,8})',
			'embed-src' : 'http://flash.revver.com/player/1.0/player.swf?mediaId=$2',
			'embed-width' : '480',
			'embed-height' : '392',
		  },
		  {
			'title' : 'Vimeo',
			'website' : 'http://www.vimeo.com',
			'url-match' : 'http://(?:www\.)?vimeo\.com/([0-9]{1,12})',
			'embed-src' : 'http://vimeo.com/moogaloop.swf?clip_id=$2&server=vimeo.com&fullscreen=1&show_title=1&show_byline=1&show_portrait=0&color=01AAEA',
			'embed-width' : '400',
			'embed-height' : '302',
			'iframe-player' : 'http://player.vimeo.com/video/$2',
		  },
		  {
			'title' : '123video',
			'website' : 'http://www.123video.nl',
			'url-match' : 'http://(?:www\.)?123video\.nl/(?:playvideos\.asp\\?(?:[^"]*?)?MovieID=|123video_share\.swf\\?mediaSrc=)([0-9]{1,8})',
			'embed-src' : 'http://www.123video.nl/123video_share.swf?mediaSrc=$2',
			'embed-width' : '420',
			'embed-height' : '339',
		  },
		  {
			'title' : '5min Life Videopedia',
			'website' : 'http://www.5min.com',
			'url-match' : 'http://(?:www\.)?5min\.com/(?:Embeded/|Video/(?:[0-9a-z_-]*?)?-)([0-9]{8})',
			'embed-src' : 'http://www.5min.com/Embeded/$2/',
			'embed-width' : '425',
			'embed-height' : '355',
		  },
		  {
			'title' : 'AdultSwim',
			'website' : 'http://www.adultswim.com',
			'url-match' : 'http://www\.adultswim\.com/video/(?:vplayer/index\.html\\?id=|\\?episodeID=|ASVPlayer\.swf\\?id=)([0-9a-f]{32})',
			'embed-src' : 'http://www.adultswim.com/video/vplayer/index.html?id=$2',
			'embed-width' : '425',
			'embed-height' : '355',
		  },
		  {
			'title' : 'AniBoom',
			'website' : 'http://www.aniboom.com',
			'url-match' : 'http://(?:www\.|api\.)?aniboom\.com/(?:Player.aspx\\?(?:[^"]*?)?v=|video/|e/)([0-9]{1,10})',
			'embed-src' : 'http://api.aniboom.com/e/$2',
			'embed-width' : '425',
			'embed-height' : '355',
		  },
		  {
			'title' : 'AOL Video (Old)',
			'website' : 'http://video.aol.com',
			'url-match' : 'http://video\.aol\.com/partner/([a-z0-9-_]+)/([a-z0-9-_]+)/([a-z0-9:\.]+)',
			'embed-src' : 'http://media.mtvnservices.com/$4',
			'embed-width' : '415',
			'embed-height' : '347',
		  },
		  {
			'title' : 'Archive.org',
			'website' : 'http://www.archive.org',
			'url-match' : 'http://(?:www\.)?archive\.org/download/((?:[0-9a-z_-]*?)/(?:[0-9a-z_-]*?)\.flv)',
			'embed-src' : 'http://www.archive.org/flow/FlowPlayerLight.swf?config=%7Bembedded%3Atrue%2CshowFullScreenButton%3Atrue%2CshowMuteVolumeButton%3Atrue%2CshowMenu%3Atrue%2CautoBuffering%3Afalse%2CautoPlay%3Afalse%2CinitialScale%3A%27fit%27%2CmenuItems%3A%5Bfalse%2Cfalse%2Cfalse%2Cfalse%2Ctrue%2Ctrue%2Cfalse%5D%2CusePlayOverlay%3Afalse%2CshowPlayListButtons%3Atrue%2CplayList%3A%5B%7Burl%3A%27$2%27%7D%5D%2CcontrolBarGloss%3A%27high%27%2CshowVolumeSlider%3Atrue%2CbaseURL%3A%27http%3A%2F%2Fwww%2Earchive%2Eorg%2Fdownload%2F%27%2Cloop%3Afalse%2CcontrolBarBackgroundColor%3A%270x000000%27%7D',
			'embed-width' : '480',
			'embed-height' : '360',
		  },
		  {
			'title' : 'Atom',
			'website' : 'http://www.atom.com',
			'url-match' : 'http://(?:www\.)?atom\.com/funny_videos/([A-z0-9-_]*)/',
			'fetch-match' : '<embed src="([A-z:/\.0-9-_=]*)"',
			'embed-src' : '$2',
			'embed-width' : '425',
			'embed-height' : '354',
		  },
		  {
			'title' : 'Island Tickle Video',
			'website' : 'http://www.islandticklevideo.com',
			'url-match' : 'http://(?:www\.)?islandticklevideo\.com/mediashare/video/(.*)',
			'fetch-match' : 'http://www\.islandticklevideo\.com/mediashare/modules/vPlayer/vPlayercfg\.php\\?id=([a-z0-9]{10,25})',
			'embed-src' : 'http://www.islandticklevideo.com/mediashare/modules/vPlayer/vPlayer.swf?f=http://www.islandticklevideo.com/mediashare/modules/vPlayer/vPlayercfg.php?id=$2',
			'embed-width' : '480',
			'embed-height' : '385',
		  },
		  {
			'title' : 'Bebo',
			'website' : 'http://www.bebo.com',
			'url-match' : '(http://bebo\.(?:[0-9]{1,4})\.download\.videoegg\.com(?:(?:/(?:[0-9a-z]*)){5}))',
			'embed-src' : 'http://static.videoegg.com/videoegg/loader.swf?file=$2',
			'embed-width' : '425',
			'embed-height' : '350',
		  },
		  {
			'title' : 'Blastro',
			'website' : 'http://www.blastro.com',
			'url-match' : 'http://(?:www\.)?blastro\.com/player/([a-z0-9-_]*)\.html',
			'embed-src' : 'http://images.blastro.com/images/flashplayer/flvPlayer.swf?site=www.blastro.com&amp;filename=$2',
			'embed-width' : '512',
			'embed-height' : '408',
		  },
		 {
		   'title' : 'Blip.tv',
		   'website' : 'http://www.blip.tv',
		   'url-match' : 'http://blip\.tv/(play|file)/([0-9]*)',
		   'fetch-match' : '<link rel="video_src" href="([A-z:/\.0-9-_=]*)',
		   'embed-src' : '$2',
		   'embed-width' : '500',
		   'embed-height' : '315',
		 },
		  {
			'title' : 'BoFunk',
			'website' : 'http://www.bofunk.com',
			'url-match' : 'http://(?:www\.)?bofunk\.com/video/[0-9]{2,7}/',
			'fetch-match' : '<embed src="/[a-z]/([a-z:/\.0-9-_=?%]*)"',
			'embed-src' : 'http://www.bofunk.com/e/$2',
			'embed-width' : '446',
			'embed-height' : '370',
		  },
		  {
			'title' : 'Break',
			'website' : 'http://www.break.com/',
			'url-match' : 'http://(?:www\.)?break\.com/(?:index|usercontent)/',
			'fetch-match' : 'http://embed\.break\.com/([0-9a-z]{1,8})',
			'embed-src' : '$1',
			'embed-width' : '464',
			'embed-height' : '383',
		  },
		  {
			'title' : 'Brightcove.com',
			'website' : 'http://link.brightcove.com',
			'url-match' : 'http://link\.brightcove\.com/services/link/bcpid([0-9]+)/bctid([0-9]+)',
			'embed-src' : 'http://services.brightcove.com/services/viewer/federated_f8/$2?videoId=$3&playerId=$2&viewerSecureGatewayURL=https://console.brightcove.com/services/amfgateway&servicesURL=http://services.brightcove.com/services&cdnURL=http://admin.brightcove.com&domain=embed&autoStart=false&',
			'embed-width' : '486',
			'embed-height' : '412',
		  },
		  {
			'title' : 'CBS News',
			'website' : 'http://www.cbsnews.com/video',
			'url-match' : 'http://(?:www\.)?cbsnews\.com/video/watch/',
			'fetch-match' : 'CBSVideo\.setVideoId\(.([a-z0-9-_]{1,32}).\)',
			'embed-src' : 'http://cnettv.cnet.com/av/video/cbsnews/atlantis2/player-dest.swf',
			'embed-width' : '425',
			'embed-height' : '324',
			'flashvars' : 'tag=contentBody;housing&releaseURL=http://cnettv.cnet.com/av/video/cbsnews/atlantis2/player-dest.swf&videoId=$2&partner=news&vert=News&autoPlayVid=false&name=cbsPlayer&allowScriptAccess=always&wmode=transparent&embedded=y&scale=noscale&rv=n&salign=tl'
		  },
		  {
			'title' : 'Cellfish',
			'website' : 'http://www.cellfish.com',
			'url-match' : 'http://(cellfish\.|www\.)?cellfish\.com/(?:video|ringtone|multimedia)/([0-9]{1,10})/',
			'embed-src' : 'http://$2cellfish.com/static/swf/player8.swf?Id=$3',
			'embed-width' : '420',
			'embed-height' : '315',
		  },
		  {
			'title' : 'Clarin',
			'website' : 'http://www.videos.clarin.com',
			'url-match' : 'http://(?:www\.)videos\.clarin\.com/index\.html\\?id=([0-9]{1,12})',
			'embed-src' : 'http://www.clarin.com/shared/v9/swf/clarinvideos/player.swf',
			'embed-width' : '533',
			'embed-height' : '438',
			'flashvars' : 'autoplay=false&amp;SEARCH=http://www.videos.clarin.com/decoder/buscador_getMtmYRelacionados/$2|CLARIN_VIDEOS|VIDEO|EMBEDDED|10|1|10|null.xml&amp;RUTAS=http://www.clarin.com/shared/v9/swf/clarinvideos/rutas.xml',
		  },
		  {
			'title' : 'Clip.vn',
			'website' : 'http://www.clip.vn',
			'url-match' : 'http://(?:www\.)?clip\.vn/w(?:atch/(?:[a-z0-9-_]*?))?/([a-z0-9_-]{1,5}},vn)',
			'embed-src' : 'http://www.clip.vn/w/$2,vn,0,,hq',
			'embed-width' : '448',
			'embed-height' : '361',
		  },
		  {
			'title' : 'ClipFish (Old)',
			'website' : 'http://www.clipfish.de',
			'url-match' : 'http://(?:www\.)?clipfish\.de/(?:(?:player\.php|videoplayer\.swf)\\?(?:[^"]*?)?vid=|video/)([0-9]{1,20})',
			'embed-src' : 'http://www.clipfish.de/videoplayer.swf?as=0&vid=$2&r=1',
			'embed-width' : '464',
			'embed-height' : '380',
		  },
		  {
			'title' : 'ClipFish (New)',
			'website' : 'http://www.clipfish.de',
			'url-match' : 'http://(?:www\.)?clipfish\.de/(?:video)?player\.(?:swf|php)(?:[^"]*?)videoid=((?:[a-z0-9]{18})(?:==)?|(?:[a-z0-9]{6})(?:==)?)',
			'embed-src' : 'http://www.clipfish.de/videoplayer.swf?as=0&videoid=$2%3D%3D&r=1',
			'embed-width' : '464',
			'embed-height' : '380',
		  },
		  {
			'title' : 'ClipJunkie',
			'website' : 'http://www.clipjunkie.com',
			'url-match' : 'http://(?:www\.)?clipjunkie\.com/((?:[^"]*?)-vid(?:[0-9]{1,10}))\.html',
			'embed-src' : 'http://www.clipjunkie.com/flvplayer/flvplayer.swf?flv=http://videos.clipjunkie.com/videos/$2.flv&themes=http://www.clipjunkie.com/flvplayer/themes.xml&playList=http://www.clipjunkie.com/playlist.php&config=http://www.clipjunkie.com/skin/config.xml',
			'embed-width' : '460',
			'embed-height' : '357',
		  },
		  {
			'title' : 'ClipMoon',
			'website' : 'http://www.clipmoon.com',
			'url-match' : 'http://(?:www\.)?clipmoon\.com/(?:videos/|(?:[^"]*?)viewkey=)([0-9a-z]{1,10})',
			'embed-src' : 'http://www.clipmoon.com/flvplayer.swf?config=http://www.clipmoon.com/flvplayer.php?viewkey=$2&external=yes',
			'embed-width' : '460',
			'embed-height' : '357',
		  },
		  {
			'title' : 'Clipser',
			'website' : 'http://www.clipser.com',
			'url-match' : 'http://(?:www\.)?clipser\.com/(?:Play\\?vid=|watch_video/)([0-9]{4,10})',
			'embed-src' : 'http://www.clipser.com/Play?vid=$2',
			'embed-width' : '425',
			'embed-height' : '355',
		  },
		  {
			'title' : 'ClipShack',
			'website' : 'http://www.clipshack.com',
			'url-match' : 'http://(?:www\.)?clipshack\.com/Clip\.aspx\\?key=([0-9a-f]{16})',
			'embed-src' : 'http://www.clipshack.com/player.swf?key=$2',
			'embed-width' : '430',
			'embed-height' : '370',
		  },
		  {
			'title' : 'CNetTV',
			'website' : 'http://cnettv.cnet.com',
			'url-match' : 'http://cnettv\.cnet\.com/[a-z0-9\-]*\/[0-9]{4}-[0-9]_[0-9]{2}-([0-9]{5,9})\.html',
			'embed-src' : 'http://www.cnet.com/av/video/flv/universalPlayer/universalSmall.swf',
			'embed-width' : '364',
			'embed-height' : '280',
			'flashvars' : 'playerType=embedded&type=id&value=$2',
		  },
		  {
			'title' : 'CollegeHumor',
			'website' : 'http://www.collegehumour.com',
			'title' : 'CollegeHumor',
			'url-match' : 'http://(?:www\.)?collegehumor\.com/video:([0-9]{1,12})',
			'embed-src' : 'http://www.collegehumor.com/moogaloop/moogaloop.swf?clip_id=$2',
			'embed-width' : '480',
			'embed-height' : '360',
		  },
		  {
			'title' : 'TheDailyShow',
			'website' : 'http://www.thedailyshow.com',
			'url-match' : 'http://(?:www\.)?thedailyshow\.com/(?:watch|full\-episodes)',
			'fetch-match' : 'swfo.embedSWF\\(.*(http://media.mtvnservices.com/mgid:cms:(video|fullepisode):comedycentral\.com:[0-9]{1,10})',
			'embed-src' : '$2',
			'embed-width' : '360',
			'embed-height' : '301',
		  },
		  {
			'title' : 'ColbertNation',
			'website' : 'http://www.colbertnation.com',
			'url-match' : 'http:\/\/(?:www\.)?colbertnation\.com\/the-colbert-report-videos\/([0-9]*)\/',
			'embed-src' : 'http://media.mtvnservices.com/mgid:cms:item:comedycentral.com:$2',
			'embed-width' : '360',
			'embed-height' : '301',
		  },
		  {
			'title' : 'Crackle',
			'website' : 'http://www.crackle.com',
			'url-match' : 'http://(?:www\.)?crackle\.com/c/([a-z0-9_]*?)/([a-z0-9_]*?)/([0-9]{1,10})',
			'embed-src' : 'http://www.crackle.com/p/$2/$3.swf?id=$4',
			'embed-width' : '400',
			'embed-height' : '328',
		  },
		  {
			'title' : 'CrunchyRoll',
			'website' : 'http://www.crunchyroll.com',
			'url-match' : 'http://(?:www\.)?crunchyroll\.com/getitem\\?ih=([0-9a-z]{19})&(?:amp;)?videoid=([0-9]{1,12})&(?:amp;)?mediaid=([0-9]{1,12})&(?:amp;)?hash=([0-9a-z]{19})',
			'embed-src' : ' http://www.crunchyroll.com/flash/20080910153703.043ec803b06cc356a1e15c1184831a24/oldplayer2.swf?file=http%3A%2F%2Fwww.crunchyroll.com%2Fgetitem%3Fih%3D$2%26videoid%3D$3%26mediaid%3D$4%26hash%3D$5&autostart=false',
			'embed-width' : '576',
			'embed-height' : '325',
		  },
		  {
			'title' : 'Current',
			'website' : 'http://www.current.com',
			'url-match' : 'http://(?:www\.)?current\.com/items/([0-9]{8})',
			'embed-src' : 'http://current.com/e/$2/en_US',
			'embed-width' : '400',
			'embed-height' : '400',
		  },
		  {
			'title' : 'Dailyhaha',
			'website' : 'http://www.dailyhaha.com',
			'url-match' : 'http://(?:www\.)?dailyhaha\.com/_vids/(?:Whohah\.swf\\?Vid=)?([a-z0-9_-]*?)\.(?:htm|flv)',
			'embed-src' : 'http://www.dailyhaha.com/_vids/Whohah.swf?Vid=$2.flv',
			'embed-width' : '425',
			'embed-height' : '350',
		},
		  {
			'title' : 'Dave.tv',
			'website' : 'http://www.dave.tv',
			'url-match' : 'http://(?:www\.)?dave\.tv/MediaPlayer.aspx\\?(?:[^"]*?)?contentItemId=([0-9]{1,10})',
			'embed-src' : 'http://dave.tv/dbox/dbox_small.swf?configURI=http://dave.tv/dbox/config.ashx&volume=50&channelContentId=$2',
			'embed-width' : '300',
			'embed-height' : '260',
		  },
		  {
			'title' : 'DotSub (w/o Captions)',
			'website' : 'http://www.dotsub.com',
			'url-match' : 'http://(?:www\.)?dotsub\.com/(?:media/|view/)((?:[0-9a-z]{8})(?:(?:-(?:[0-9a-z]{4})){3})-(?:[0-9a-z]{12}))',
			'embed-src' : 'http://dotsub.com/static/players/embed8l.swf?mediauri=http://dotsub.com/media/$2/em/flv/en',
			'embed-width' : '480',
			'embed-height' : '392',
		  },
		  {
			'title' : 'DoubleViking',
			'website' : 'http://www.doubleviking.com',
			'url-match' : 'http://(?:www\.)?doubleviking\.com/videos/page[0-9]\.html/[a-z\-]*[0-9]{1,8}\.html',
			'embed-src' : 'http://www.doubleviking.com/mediaplayer.swf?file=$2',
			'embed-width' : '400',
			'embed-height' : '340',
		  },
		  {
			'title' : 'Dropshots',
			'website' : 'http://www.dropshots.com',
			'title' : 'dropshots.com',
			'url-match' : '(http://media(?:[0-9]{0,2})\.dropshots\.com/photos(?:(?:/(?:[0-9]{1,10})){1,3})\.flv)',
			'embed-src' : 'http://www.dropshots.com/dropshotsplayer.swf?url=$2',
			'embed-width' : '480',
			'embed-height' : '385',
		  },
		  {
			'title' : 'Dv.ouou',
			'website' : 'http://dv.ouou.com',
			'url-match' : 'http://dv\.ouou\.com/(?:play/v_|v/)([a-f0-9]{14})',
			'embed-src' : 'http://dv.ouou.com/v/$2',
			'embed-width' : '480',
			'embed-height' : '385',
		  },
		  {
			'title' : 'Divshare',
			'website' : 'http://www.divshare.com',
			'url-match' : 'http://www\.divshare\.com/download/([^"]*)',
			'embed-src' : 'http://www.divshare.com/flash/playlist?myId=$2',
			'embed-width' : '335',
			'embed-height' : '28',
		  },
		  {
			'title' : 'EASportsWorld',
			'website' : 'http://www.easportsworld.com',
			'url-match' : '(http://videocdn\.easw\.easports\.com/easportsworld/media/(?:[0-9]{1,12})/(?:[0-9a-z-_]*?)\.flv)',
			'embed-src' : 'http://ll-999.ea.com/sonet-easw/2.2.4.0/flash/sw/videos/mediaplayer.swf?file=$2&image=http://ll-999.ea.com/sonet-easw/2.2.4.0/images/sw/videos/preview.jpg&backcolor=0x000000&frontcolor=0x006BCC&lightcolor=0x006BCC',
			'embed-width' : '566',
			'embed-height' : '355',
		  },
		  {
			'title' : 'EbaumsWorld',
			'website' : 'http://www.ebaumsworld.com',
			'url-match' : 'http://www\.ebaumsworld\.com/(?:video|audio)/(?:watch|play)',
			'fetch-match' : 'id="embed".*flashvars=&quot;(.*)&quot;\ wmode',
			'embed-src' : 'http://www.ebaumsworld.com/mediaplayer.swf',
			'embed-width' : '425',
			'embed-height' : '345',
			'flashvars' : '$2',
		  },
		  {
			'title' : 'ESPN',
			'website' : 'http://www.espn.com',
			'url-match' : 'http://espn\.go\.com/video/clip\\?id=([0-9a-z]*)',
			'embed-src' : 'http://espn.go.com/videohub/player/embed.swf',
			'embed-width' : '384',
			'embed-height' : '216',
			'flashvars' : 'id=$2',
		  },
		  {
			'title' : 'Fandome',
			'website' : 'http://www.fandome.com',
			'url-match' : 'http://[a-z]*\.fandome\.com/video/([0-9]{3,6})/[a-z0-9\-_]*/',
			'embed-src' : 'http://www.kaltura.com/index.php/kwidget/wid/_35168/uiconf_id/1070752',
			'embed-width' : '480',
			'embed-height' : '380',
			'flashvars' : 'entryId=http://s3.amazonaws.com/lazyjock/$2.flv&amp;autoplay=false',
		  },
		  {
			'title' : 'Flickr',
			'website' : 'http://www.flickr.com',
			'url-match' : 'http://(?:www\.|www2\.)?flickr\.com/photos/[a-z0-9-_]*/([0-9]{8,12})',
			'fetch-match' : 'id="stewart_swf([0-9]{8,12})_div"',
			'embed-src' : 'http://www.flickr.com/apps/video/stewart.swf',
			'embed-width' : '400',
			'embed-height' : '300',
			'flashvars' : 'intl_lang=en-us&amp;photo_id=$2',
		  },
		  {
			'title' : 'FunnyOrDie',
			'website' : 'http://www.funnyordie.com',
			'url-match' : 'http://(?:www\.|www2\.)?funnyordie\.com/(?:videos/|public/flash/fodplayer\.swf\\?key=)([0-9a-z]{8,12})',
			'embed-src' : 'http://player.ordienetworks.com/flash/fodplayer.swf',
			'embed-width' : '464',
			'embed-height' : '388',
			'flashvars' : 'key=$2',
		  },
		  {
			'title' : 'FunMansion',
			'website' : 'http://www.funmansion.com',
			'url-match' : 'http://www\.funmansion\.com/videos/[a-z0-9-_]*\.html',
			'fetch-match' : '<iframe src="http://media\.funmansion\.com/funmansion/player/player\.php\\?url=([a-z0-9:/\.-_]*\.flv)',
			'embed-src' : 'http://media.funmansion.com/funmansion/player/flvplayer.swf?flv=$2',
			'embed-width' : '446',
			'embed-height' : '350',
		  },
		  {
			'title' : 'G4TV',
			'website' : 'http://www.g4tv.com',
			'url-match' : 'http://(?:www\.)?g4tv\.com/(?:xplay/videos/|lv3/|sv3/)([0-9]{1,10})',
			'embed-src' : 'http://www.g4tv.com/lv3/$2',
			'embed-width' : '480',
			'embed-height' : '418',
		  },
		  {
			'title' : 'GameKyo',
			'website' : 'http://www.gamekyo.com',
			'url-match' : 'http://(?:www\.)?gamekyo\.com/(?:video|flash/flvplayer\.swf\\?videoid=)[a-z]{2}([0-9]{1,7})',
			'embed-src' : 'http://www.gamekyo.com/flash/flvplayer.swf?videoid=$2',
			'embed-width' : '512',
			'embed-height' : '307',
		},
		  {
			'title' : 'GameSpot',
			'website' : 'http://www.gamespot.com',
			'url-match' : 'http://(?:(?:[a-z]*?)\.)?gamespot\.com/(?:[^"]*?)video/(?:(?:[0-9]{1,12})/)?([0-9]{1,12})',
			'embed-src' : 'http://image.com.com/gamespot/images/cne_flash/production/media_player/proteus/one/proteus2.swf',
			'embed-width' : '432',
			'embed-height' : '362',
			'flashvars' : 'skin=http://image.com.com/gamespot/images/cne_flash/production/media_player/proteus/one/skins/gamespot.png&paramsURI=http%3A%2F%2Fwww.gamespot.com%2Fpages%2Fvideo_player%2Fxml.php%3Fid%3D$2%26mode%3Dembedded%26width%3D432%26height%3D362%2F',
		},
		  {
			'title' : 'GameTrailers (Inc. User Movies)',
			'website' : 'http://www.gametrailers.com',
			'url-match' : 'http://(?:www\.)?gametrailers\.com/(?:player/(u)?(?:sermovies/)?|remote_wrap\.php\\?(u)?mid=)([0-9]{1,10})',
			'embed-src' : 'http://www.gametrailers.com/remote_wrap.php?$2$3mid=$4', //Either $2 or $3 will be empty
			'embed-width' : '480',
			'embed-height' : '392',
		  },
		  {
			'title' : 'GameTube',
			'website' : 'http://www.gametube.org',
			'title' : 'Gametube.org',
			'url-match' : 'http://(?:www\.)?gametube\.org/(?:\#/video/|htmlVideo\.jsp\\?id=|miniPlayer\.swf\\?vidId=)([A-z0-9=_-]{28})',
			'embed-src' : 'http://www.gametube.org/miniPlayer.swf?vidId=$2',
			'embed-width' : '425',
			'embed-height' : '335',
		  },
		  {
			'title' : 'GameVideos.1up',
			'website' : 'http://www.gamevideos.1up.com',
			'url-match' : 'http://(?:www\.)?gamevideos(?:\.1up)?\.com/(?:video/id/|video/embed\\?(?:[^"]*?)?video=)([0-9]{1,8})',
			'embed-src' : 'http://gamevideos.1up.com/swf/gamevideos11.swf?embedded=1&fullscreen=1&autoplay=0&src=http://gamevideos.1up.com/video/videoListXML%3Fid%3D$2%26adPlay%3Dfalse',
			'embed-width' : '500',
			'embed-height' : '319',
		  },
		  {
			'title' : 'GarageTv',
			'website' : 'http://www.garagetv.be',
			'url-match' : '(http://www\.garagetv\.be/v/(?:[0-9a-z-\!_]*?)/v\.aspx)',
			'embed-src' : '$2',
			'embed-width' : '430',
			'embed-height' : '369',
		  },
		  {
			'title' : 'Gloria',
			'website' : 'http://www.gloria.tv',
			'url-match' : 'http://(?:www\.)?gloria\.tv/\\?video=([a-z0-9]{20})',
			'embed-src' : 'http://www.gloria.tv/flvplayer.swf?file=http%3A%2F%2Fwww.gloria.tv%2F%3Fembed%26video%3D$2%26width%3D512%26height%3D288&type=flv&image=http%3A%2F%2Fwww.gloria.tv%2F%3Fembed%26image%3D$2%26width%3D512%26height%3D288&autostart=false&showdigits=true&usefullscreen=false&logo=http%3A%2F%2Fwww.gloria.tv%2Fimage%2Flogo_embed.png&link=http%3A%2F%2Fwww.gloria.tv%2F%3Fvideo%3Dddexrl6eelym3gaabxmz%26amp%3Bview%3Dflash&linktarget=_blank&volume=100&backcolor=0xe0e0e0&frontcolor=0x000000&lightcolor=0xf00000',
			'embed-width' : '512',
			'embed-height' : '404',
		  },
		  {
			'title' : 'GoEar',
			'website' : 'http://www.goear.com',
			'url-match' : 'http://(?:www\.)?goear\.com/listen\.php\\?v=([a-z0-9]{7})',
			'embed-src' : 'http://www.goear.com/files/external.swf?file=$2',
			'embed-width' : '353',
			'embed-height' : '132',
		  },
		  {
			'title' : 'Good.IS',
			'website' : 'http://www.good.is',
			'url-match' : 'http://www\.good\.is/\\?p=([0-9]{3,7})',
			'fetch-match' : '(http:\/\/s3\.amazonaws\.com\/.*Url=http:\/\/www\.good\.is\/\\?p=[0-9]{3,7})&quot;\/&gt;&lt;embed src=&',
			'embed-src' : '$2',
			'embed-width' : '416',
			'embed-height' : '264',
			'flashvars' : '$2',
		  },

		  {
			'title' : 'Glumbert',
			'website' : 'http://www.glumbert.com',
			'url-match' : 'http://(?:www\.)?glumbert\.com/(?:embed|media)/([a-z0-9_-]{1,30})',
			'embed-src' : 'http://www.glumbert.com/embed/$2',
			'embed-width' : '425',
			'embed-height' : '335',
		  },
		  {
			'title' : 'GodTube',
			'website' : 'http://www.godtube.com',
			'url-match' : 'http://(?:www\.)?godtube\.com/view_video\.php\\?(?:[^"]*?)?viewkey=([0-9a-f]{20})',
			'embed-src' : 'http://godtube.com/flvplayer.swf?viewkey=$2',
			'embed-width' : '330',
			'embed-height' : '270',
		  },
		  {
			'title' : 'GrindTv',
			'website' : 'http://www.grindtv.com',
			'url-match' : '(http://(?:www\.)?grindtv\.com/video/(.*)/(?:[^"]*?)i=(?:[0-9]{1,12}))',
			'embed-src' : 'http://images.grindtv.com/1.0.2/swf/video.swf?sa=1&si=1&i=$3&sct=$2',
			'embed-width' : '640',
			'embed-height' : '480',
		  },
		  {
			'title' : 'Guzer',
			'website' : 'http://www.guzer.com',
			'url-match' : 'http://(?:www\.)?guzer\.com/videos/(.*).php',
			'embed-src' : 'http://www.guzer.com/player/mediaplayer.swf',
			'embed-width' : '486',
			'embed-height' : '382',
			'flashvars' : 'height=382&amp;width=486&amp;file=http://media.guzer.com/videos/$2.flv&amp;image=http://www.guzer.com/videos/s$2.jpg'
		  },
		  {
			'title' : 'TheHub',
			'website' : 'http://hub.witness.org',
			'url-match' : 'http://hub\.witness\.org/(?:en|fr|es)/node/([0-9]{1,10})',
			'embed-src' : 'http://hub.witness.org/sites/hub.witness.org/modules/contrib-5/flvmediaplayer/mediaplayer.swf?file=http://hub.witness.org/xspf/node/$2&overstretch=fit&repeat=false&logo=http://hub.witness.org/sites/hub.witness.org/themes/witness/images/hub_wm.png',
			'embed-width' : '320',
			'embed-height' : '260',
		  },
		  {
			'title' : 'Howcast',
			'website' : 'http://www.howcast.com',
			'url-match' : 'http://(?:www\.)?howcast\.com/videos/([0-9]{1,8})',
			'embed-src' : 'http://www.howcast.com/flash/howcast_player.swf?file=$2&theme=black',
			'embed-width' : '432',
			'embed-height' : '276',
		  },
		  {
			'title' : 'Hulu (Usa Only)',
			'website' : 'http://www.hulu.com',
			'url-match' : 'http://(?:www\.)?hulu\.com/watch/(?:[0-9]{1,8})/',
			'fetch-match' : '<link rel="video_src" href="([A-z:/\.0-9-_=?]*)',
			'embed-src' : '$2',
			'embed-width' : '512',
			'embed-height' : '296',
		  },
		  {
			'title' : 'Humour',
			'website' : 'http://www.humour.com',
			'url-match' : 'http://(?:video|www)\.humour\.com/videos-comiques/videos.asp\\?[A-z]*\=([1-9]{1,8})',
			'embed-src' : '/videos-comiques/player/mediaplayer.swf',
			'embed-width' : '425',
			'embed-height' : '355',
		  },
		  {
			'title' : 'Video.i.ua',
			'website' : 'http://video.i.ua',
			'url-match' : '(http://i1\.i\.ua/video/vp3\.swf\\?9&(?:amp;)?userID=(?:[0-9]{1,20})&(?:amp;)?videoID=(?:[0-9]{1,20})&(?:amp;)?playTime=(?:[0-9]{1,20})&(?:amp;)?repeat=0&(?:amp;)?autostart=0&(?:amp;)?videoSize=(?:[0-9]{1,20})&(?:amp;)?userStatus=(?:[0-9]{1,2})&(?:amp;)?notPreview=(?:[0-9]{1,2})&(?:amp;)?mID=m?(?:[0-9]{1,2}))',
			'embed-src' : '$2',
			'embed-width' : '450',
			'embed-height' : '349',
		  },
		  {
			'title' : 'IGN',
			'website' : 'http://www.ign.com',
			'url-match' : 'http://(?:(?:(?:[a-z0-9]*?)\.){0,3})ign\.com/(?:[a-z0-9-_]*?)?/objects/([0-9]{1,10})/(?:(?:[a-z0-9-_]*?)/)?videos/',
			'embed-src' : 'http://videomedia.ign.com/ev/ev.swf?object_ID=$2',
			'embed-width' : '433',
			'embed-height' : '360',
		  },
		  {
			'title' : 'iJigg',
			'website' : 'http://www.ijigg.com',
			'url-match' : 'http://(?:www\.)?ijigg\.com/(?:jiggPlayer\.swf\\?songID=|songs/|trackback/)([0-9A-Z]{9,12})',
			'embed-src' : 'http://www.ijigg.com/jiggPlayer.swf?songID=$2&Autoplay=0',
			'embed-width' : '315',
			'embed-height' : '80',
		  },
		  {
			'title' : 'IMDB',
			'website' : 'http://www.imdb.com',
			'url-match' : 'http://(?:www\.)?totaleclips\.com/Player/Bounce\.aspx\\?eclipid=([0-9a-z]{1,12})&(?:amp;)?bitrateid=([0-9]{1,10})&(?:amp;)?vendorid=([0-9]{1,10})&(?:amp;)?type=\.flv',
			'embed-src' : 'http://www.imdb.com/images/js/app/video/mediaplayer.swf?file=http%3A%2F%2Fwww.totaleclips.com%2FPlayer%2FBounce.aspx%3Feclipid%3D$2%26bitrateid%3D$3%26vendorid%3D$4%26type%3D.flv&backcolor=0x000000&frontcolor=0xCCCCCC&lightcolor=0xFFFFCC&shuffle=false&autostart=false',
			'embed-width' : '480',
			'embed-height' : '380',
		  },
		  {
			'title' : 'ImageShack',
			'website' : 'http://www.imageshack.us',
			'url-match' : 'http://img([0-9]{1,5})\.imageshack\.us/img[0-9]{1,5}/[0-9]{1,7}/([a-z0-9-_]{1,28})\.(?:flv|swf)',
			'embed-src' : 'http://img$2.imageshack.us/flvplayer.swf?f=T$3&autostart=false',
			'embed-width' : '424',
			'embed-height' : '338',
		  },
		  {
			'title' : 'IndyaRocks',
			'website' : 'http://www.indyarocks.com',
			'url-match' : 'http://(?:www\.)?indyarocks\.com/videos/(?:(?:(?:(?:[^-"]*?)-){1,10})|embed-)([0-9]{1,8})',
			'embed-src' : 'http://www.indyarocks.com/videos/embed-$2',
			'embed-width' : '425',
			'embed-height' : '350',
		  },
		  {
			'title' : 'iReport',
			'website' : 'http://www.ireport.com',
			'url-match' : 'http://www\.ireport\.com/docs/DOC-([0-9]{4,8})',
			'embed-src' : 'http://www.ireport.com/themes/custom/resources/cvplayer/ireport_embed.swf?player=embed&configPath=http://www.ireport.com&playlistId=$2&contentId=$2/0&',
			'embed-width' : '400',
			'embed-height' : '300',
		  },
		  {
			'title' : 'Izlesene',
			'website' : 'http://www.izlesene.com',
			'url-match' : 'http://(?:www\.)?izlesene\.com/(?:player2\.swf\\?video=|video/(?:[a-z0-9-_]*?)/)([0-9]{1,10})',
			'embed-src' : 'http://www.izlesene.com/player2.swf?video=$2',
			'embed-width' : '425',
			'embed-height' : '355',
		  },
		  {
			'title' : 'Jamendo',
			'website' : 'http://www.jamendo.com',
			'url-match' : 'http://(?:www\.|widgets\.)?jamendo\.com/(?:[a-z0-9]*?)/album/(?:\\?album_id=)?([0-9]{1,10})',
			'embed-src' : 'http://widgets.jamendo.com/en/album/?album_id=$2&playertype=2008',
			'embed-width' : '200',
			'embed-height' : '300',
		  },
		  {
			'title' : 'Jokeroo',
			'website' : 'http://www.jokeroo.com',
			'url-match' : 'http://(?:www\.)?jokeroo\.com/(auto|educational|financial|health|howto|lawyers|politics|travel|extremesports|funnyvideos)/((?:(?:[0-9a-z]*?)/){0,3})?([0-9a-z_]*?)\.htm',
			'embed-src' : 'http://www.jokeroo.com/promotional_player2.swf?channel&vid=http://uploads.filecabin.com/flash/$4.flv&vid_url=http://www.jokeroo.com/$2/$3$4.html&adv_url',
			'embed-width' : '490',
			'embed-height' : '425',
		  },
		  {
			'title' : 'JujuNation Video',
			'website' : 'http://www.jujunation.com',
			'url-match' : 'http://(?:www\.)?jujunation.com/viewVideo\.php\\?video_id=([0-9]{1,10})',
			'embed-src' : 'http://www.jujunation.com/flvplayer.swf?config=http://www.jujunation.com/videoConfigXmlCode.php?pg=video_$2_no_0',
			'embed-width' : '450',
			'embed-height' : '370',
		  },
		  {
			'title' : 'JujuNation Audio',
			'website' : 'http://www.jujunation.com',
			'url-match' : 'http://(?:www\.)?jujunation.com/music\.php\\?music_id=([0-9]{1,10})',
			'embed-src' : 'http://www.jujunation.com/player.swf?configXmlPath=http://www.jujunation.com/musicConfigXmlCode.php?pg=music_$2&playListXmlPath=http://www.jujunation.com/musicPlaylistXmlCode.php?pg=music_$2',
			'embed-width' : '220',
			'embed-height' : '66',
		  },
		  {
			'title' : 'JustinTV',
			'website' : 'http://www.justin.tv',
			'url-match' : 'http://(?:\w{0,3}\.)?justin\.tv/(\w*)',
			'embed-src' : 'http://www.justin.tv/widgets/jtv_player.swf?channel=$2&auto_play=false',
			'embed-width' : '353',
			'embed-height' : '295',
		  },
		  {
			'title' : 'Kewego',
			'website' : 'http://www.kewego.co.uk',
			'url-match' : 'http://(?:www\.)?kewego(?:\.co\.uk|\.com)/video/([0-9a-z]*)\.html',
			'embed-src' : 'http://www.kewego.com/swf/p3/epix.swf',
			'embed-width' : '400',
			'embed-height' : '300',
			'flashvars' : 'language_code=en&playerKey=$2&skinKey=71703ed5cea1&sig=iLyROoaftv7I&autostart=false'
		  },
		  {
			'title' : 'Koreus',
			'website' : 'http://www.koreus.com',
			'url-match' : 'http://(?:www\.)?koreus\.com/video/([0-9a-z-]{1,50})(?:\.html)?',
			'embed-src' : 'http://www.koreus.com/video/$2',
			'embed-width' : '400',
			'embed-height' : '320',
		  },
		  {
			'title' : 'Last.fm (Audio)',
			'website' : 'http://www.last.fm',
			'url-match' : 'http://(?:www\.)?last\.fm/music/([0-9a-z%\+_-]*?)/_/([0-9\+a-z_-]*)',
			'embed-src' : 'http://cdn.last.fm/webclient/s12n/s/53/lfmPlayer.swf',
			'embed-width' : '300',
			'embed-height' : '221',
			'flashvars' : 'lang=en&amp;lfmMode=playlist&amp;FOD=true&amp;resname=$3&amp;restype=track&amp;artist=$2',
		  },
		  {
			'title' : 'Last.fm (Video)',
			'website' : 'http://www.last.fm',
			'url-match' : 'http://(?:www\.)?last\.fm/music/([0-9a-zA-Z%\+_-]*?)/\+videos/([0-9\+a-z_-]{2,20})',
			'embed-src' : 'http://cdn.last.fm/videoplayer/l/17/VideoPlayer.swf',
			'embed-width' : '340',
			'embed-height' : '289',
			'flashvars' : 'uniqueName=$3&amp;FSSupport=true&amp;'
		  },
		  {
			'title' : 'Libero',
			'website' : 'http://www.libero.it',
			'url-match' : 'http://video\.libero\.it/app/play(?:/index.html)?\\?(?:[^"]*?)?id=([a-f0-9]{32})',
			'embed-src' : 'http://video.libero.it/static/swf/eltvplayer.swf?id=$2.flv&ap=0',
			'embed-width' : '400',
			'embed-height' : '333',
		  },
		  {
			'title' : 'LiveLeak',
			'website' : 'http://www.liveleak.com',
			'url-match' : 'http://(?:www\.)?liveleak\.com/(?:player.swf?autostart=false&(?:amp;)?token=|view\\?(?:[^"]*?)?i=|e/)((?:[0-9a-z]{3})_(?:[a-z0-9]{10}))',
			'embed-src' : 'http://www.liveleak.com/e/$2',
			'embed-width' : '450',
			'embed-height' : '370',
		  },
		  {
			'title' : 'LiveVideo',
			'website' : 'http://www.livevideo.com',
			'url-match' : 'http://(?:www\.)?livevideo\.com/(?:flvplayer/embed/|video/(?:view/)?(?:(?:[^"]*?)?/)?)([0-9a-f]{32})',
			'embed-src' : 'http://www.livevideo.com/flvplayer/embed/$2',
			'embed-width' : '445',
			'embed-height' : '369',
		  },
		  {
			'title' : 'Machinima (Old)',
			'website' : 'http://www.machinima.com',
			'url-match' : 'http://(?:www\.)?machinima\.com/(?:film/view&(?:amp;)?id=|#details_)([0-9]{1,8})(?:_contents)?',
			'embed-src' : 'http://www.machinima.com/_flash_media_player/mediaplayer.swf?file=http://machinima.com/p/$2',
			'embed-width' : '400',
			'embed-height' : '300',
		  },
		  {
			'title' : 'Machinima (New)',
			'website' : 'http://www.machinima.com',
			'url-match' : 'http://(?:www\.)?machinima\.com:80/f/([0-9a-f]{32})',
			'embed-src' : 'http://machinima.com:80/_flash_media_player/mediaplayer.swf?file=http://machinima.com:80/f/$2',
			'embed-width' : '400',
			'embed-height' : '300',
		  },
		  {
			'title' : 'MSNBC',
			'website' : 'http://www.msnbc.msn.com/',
			'url-match' : 'http://www\.msnbc\.msn\.com/id/(?:[0-9]{1,9})/vp/([0-9]{1,9})',
			'embed-src' : 'http://msnbcmedia.msn.com/i/MSNBC/Components/Video/_Player/swfs/embedPlayer/EmbeddedPlayer_I4.swf?domain=www.msnbc.msn.com&amp;settings=22425448&amp;useProxy=true&amp;wbDomain=www.msnbc.msn.com&amp;launch=$2&amp;sw=1920&amp;sh=1200&amp;EID=oVPEFC&amp;playerid=22425001',
			'embed-width' : '425',
			'embed-height' : '339',
		  },
		  {
			'title' : 'Video.mail.ru',
			'website' : 'http://video.mail.ru',
			'url-match' : 'http://video\.mail\.ru/mail/([0-9a-z_-]*?)/([0-9]{1,4})/([0-9]{1,4})\.html',
			'embed-src' : 'http://img.mail.ru/r/video2/player_v2.swf?par=http://content.video.mail.ru/mail/$2/$3/\$$4&page=1&username=$2&albumid=$3&id=$4',
			'embed-width' : '452',
			'embed-height' : '385',
		  },
		  {
			'title' : 'MadnessVideo',
			'website' : 'http://www.madnessvideo.net',
			'url-match' : 'http://(?:www\.)?madnessvideo\.net/(.*)',
			'embed-src' : 'http://www.madnessvideo.net/emb.aspx/$2',
			'embed-width' : '400',
			'embed-height' : '320',
		  },
		  {
			'title' : 'MotionBox',
			'website' : 'http://www.motionbox.com',
			'url-match' : 'http://(?:www\.)?motionbox\.com/videos/([0-9a-f]{14})',
			'embed-src' : 'http://www.motionbox.com/external/hd_player/type%3Dsd%2Cvideo_uid%3D$2',
			'embed-width' : '416',
			'embed-height' : '312',
		  },
		  {
			'title' : 'Mpora',
			'website' : 'http://video.mpora.com',
			'url-match' : 'http://video\.mpora\.com/watch/(\w{9})',
			'embed-src' : 'http://video.mpora.com/ep/$2/',
			'embed-width' : '425',
			'embed-height' : '350',
		  },
		  {
			'title' : 'Mp3tube',
			'website' : 'http://www.mp3tube.net',
			'url-match' : '(http://(?:www\.)?mp3tube\.net\/play\.swf\\?id=(?:[0-9a-f]{32}))',
			'embed-src' : '$2',
			'embed-width' : '260',
			'embed-height' : '60',
		  },
		  {
			'title' : 'MtvU (Usa Only)',
			'website' : 'http://www.mtvu.com',
			'url-match' : 'http://(?:www\.)?mtvu\.com/video/\\?id=([0-9]{1,9})(?:[^"]*?)vid=([0-9]{1,9})',
			'embed-src' : 'http://media.mtvu.com/player/embed/AS3/site/',
			'embed-width' : '423',
			'embed-height' : '318',
			'flashvars' : 'CONFIG_URL=http://media.mtvu.com/player/embed/AS3/site/configuration.jhtml%3fid%3D$2%26vid%3D$3%26autoPlay%3Dfalse&amp;allowFullScreen=true'
		  },
		  {
			'title' : 'MP3 Audio',
			'website' : '',
			'url-match' : '(http://[^"\'\`\<\>\@\*\$]*?\.mp3)$',
			'embed-src' : 'http://www.google.com/reader/ui/3523697345-audio-player.swf',
			'embed-width' : '400',
			'embed-height' : '27',
			'flashvars' : 'audioUrl=$2'
		  },
		  {
			'title' : 'MyNet',
			'website' : 'http://video.eksenim.mynet.com/',
			'url-match' : 'http://video\.eksenim\.mynet\.com/(?:[0-9a-z_-]*?)/(?:[0-9a-z_-]*?)/([0-9]{1,12})/',
			'embed-src' : 'http://video.eksenim.mynet.com/flvplayers/vplayer9.swf?videolist=http://video.eksenim.mynet.com/batch/video_xml_embed.php?video_id=$2',
			'embed-width' : '400',
			'embed-height' : '334',
		  },
		  {
			'title' : 'MyShows.cn/SeeHaha.com',
			'website' : 'http://www.myshows.cn',
			'url-match' : '(http://www\.seehaha\.com/flash/player\.swf\\?vidFileName=(?:[0-9]*?)\.flv)',
			'embed-src' : '$2',
			'embed-width' : '425',
			'embed-height' : '350',
		  },
		  {
			'title' : 'MySpaceTv',
			'website' : 'http://www.myspacetv.com',
			'url-match' : 'http://(?:vids\.myspace|myspacetv)\.com/index\.cfm\\?(?:[^"]*?)?VideoID=([0-9]{1,10})',
			'embed-src' : 'http://mediaservices.myspace.com/services/media/embed.aspx/m=$2',
			'embed-width' : '425',
			'embed-height' : '360',
		  },
		  {
			'title' : 'MyVideo',
			'website' : 'http://www.myvideo.de',
			'url-match' : 'http://(?:www\.)?myvideo\.(at|be|ch|de|nl)/(?:watch|movie)/([0-9]{1,8})',
			'embed-src' : 'http://www.myvideo.$2/movie/$3',
			'embed-width' : '470',
			'embed-height' : '406',
		  },
		  {
			'title' : 'MyVi',
			'website' : 'http://myvi.ru',
			'url-match' : '(http://(?:www\.)?myvi\.ru/ru/flash/player/(?:[0-9a-z_-]{45}))',
			'embed-src' : '$2',
			'embed-width' : '450',
			'embed-height' : '418',
		  },
		  {
			'title' : 'M Thai',
			'website' : 'http://video.mthai.com',
			'url-match' : 'http://video\.mthai\.com/player\.php\\?(?:[^"]*?)?id=([0-9a-z]{14,20})',
			'embed-src' : 'http://video.mthai.com/Flash_player/player.swf?idMovie=$2',
			'embed-width' : '407',
			'embed-height' : '342',
		  },
		  {
			'title' : 'NewGrounds',
			'website' : 'http://www.newgrounds.com',
			'url-match' : '(http://uploads\.ungrounded\.net/(?:[0-9]{1,12})/(?:[0-9]{1,12})_(?:[0-9a-z_-]*?)\.swf)',
			'embed-src' : '$2?autostart=false&autoplay=false',
			'embed-width' : '480',
			'embed-height' : '400',
		},
		  {
			'title' : 'NhacCuaTui',
			'website' : 'http://www.nhaccuatui.com',
			'url-match' : 'http://(?:www\.)?nhaccuatui\.com/(?:nghe\\?M=|m/)([a-z0-9-_]{10})',
			'embed-src' : 'http://www.nhaccuatui.com/m/$2',
			'embed-width' : '300',
			'embed-height' : '270',
		  },
		  {
			'title' : 'OnSmash',
			'website' : 'http://www.onsmash.com',
			'url-match' : 'http://(?:www\.|videos\.)?onsmash\.com/(?:v|e)/([0-9a-z]{16})',
			'embed-src' : 'http://videos.onsmash.com/e/$2',
			'embed-width' : '448',
			'embed-height' : '374',
		  },
		  {
			'title' : 'Orb',
			'website' : 'http://www.orb.com',
			'url-match' : 'http://mycast\.orb\.com/orb/html/qs\\?mediumId=([0-9a-z]{8})&(?:amp;)?l=([0-9a-z_-]{1,20})',
			'embed-src' : 'http://mycast.orb.com/orb/resources/common/videoplayer.swf?file=http%3A%2F%2Fmycast.orb.com%2Forb%2Fxml%2Fstream%3FstreamFormat%3Dswf%26mediumId%3D$2%26l%3D$3&showdigits=true&autostart=false&shuffle=false&showeq=true&showfsbutton=true',
			'embed-width' : '439',
			'embed-height' : '350',
		  },
		  {
			'title' : 'Photobucket',
			'website' : 'http://www.photobucket.com',
			'url-match' : 'http://media\.photobucket\.com\/video\/.*\/videos',
			'fetch-match' : '(http://vid[0-9]{1,3}\.photobucket\.com/albums/[a-z0-9]{2,5}/[a-z0-9\-_]*/videos/[a-z0-9\-_]*\.flv)',
			'embed-src' : 'http://media.photobucket.com/flash/player.swf?file=$2',
			'embed-width' : '448',
			'embed-height' : '361',
		  },
		  {
			'title' : 'PikNikTube',
			'website' : 'http://www.pikniktube.com',
			'url-match' : 'http://(?:www\.)?pikniktube\.com/(?:v/|(?:(?:[^"]*?)\\?q=))([0-9a-f]{32})',
			'embed-src' : 'http://www.pikniktube.com/player/videoplayer2.swf?linktarget=_blank&embedded=1&xmlsrc=http://www.pikniktube.com/getxmle.asp?q=$2&a=1&c=0',
			'embed-width' : '340',
			'embed-height' : '320',
		  },
		  {
			'title' : 'Project Playlist',
			'website' : 'http://www.playlist.com',
			'url-match' : 'http://(?:www\.)?playlist\.com/(?:standalone|node)/([0-9]{1,10})',
			'embed-src' : 'http://www.playlist.com/media/mp3player-standalone.swf?playlist_url=http://www.playlist.com/node/$2/playlist/xspf&config=http://www.musiclist.us/mc/config/config_black.xml&mywidth=435',
			'embed-width' : '435',
			'embed-height' : '270',
		  },
		  {
			'title' : 'Putfile',
			'website' : 'http://www.putfile.com',
			'url-match' : 'http://(?:www\.|media\.|feat\.)?putfile\.com/(?:flow/putfile\.swf\\?videoFile=|)?([a-z0-9-_]*)(?:\\?)?',
			'embed-src' : 'http://feat.putfile.com/flow/putfile.swf?videoFile=$2',
			'embed-width' : '425',
			'embed-height' : '345',
		  },
		  {
			'title' : 'Rambler',
			'website' : 'http://vision.rambler.ru',
			'url-match' : 'http://vision\.rambler\.ru/(?:i/e\.swf\\?id=|users/)((?:[0-9a-z_-]*?)/(?:[0-9]*?)/(?:[0-9]*))',
			'embed-src' : 'http://vision.rambler.ru/i/e.swf?id=$2&logo=1',
			'embed-width' : '390',
			'embed-height' : '370',
		  },
		  {
			'title' : 'RawVegas',
			'website' : 'http://www.rawvegas.tv',
			'url-match' : 'http://(?:www\.)?rawvegas\.tv/watch/[a-z\-0-9]*/([0-9a-f]{30})',
			'embed-src' : 'http://www.rawvegas.tv/ext.php?uniqueVidID=$2',
			'embed-width' : '427',
			'embed-height' : '300',
		  },
		  {
			'title' : 'RuTube',
			'website' : 'http://www.rutube.ru',
			'url-match' : 'http://(?:www\.|video\.)?rutube\.ru/(?:tracks/\d+?\.html\\?(?:(?:pos|related)=1&(?:amp;)?)?v=)?([0-9a-f]{32})',
			'embed-src' : 'http://video.rutube.ru/$2',
			'embed-width' : '470',
			'embed-height' : '353',
		  },
		  {
			'title' : 'ScreenToaster',
			'website' : 'http://www.screentoaster.com',
			'url-match' : 'http://(?:www\.)?screentoaster\.com/watch/([0-9a-zA-Z]+)',
			'embed-src' : 'http://www.screentoaster.com/swf/STPlayer.swf?video=$2',
			'embed-width' : '425',
			'embed-height' : '344',
			'flashvars' : 'video=$2',
		  },
		  {
			'title' : 'SevenLoad',
			'website' : 'http://www.sevenload.com',
			'url-match' : 'http://((?:en|tr|de|www)\.)?sevenload\.com/(?:videos|videolar)/([0-9a-z]{1,8})',
			'embed-src' : 'http://$2sevenload.com/pl/$3/425x350/swf',
			'embed-width' : '425',
			'embed-height' : '350',
		  },
		  {
			'title' : 'ShareView',
			'website' : 'http://www.shareview.us',
			'url-match' : 'http://(?:www\.)?shareview\.us/video/([0-9]{1,10})/',
			'embed-src' : 'http://www.shareview.us/nvembed.swf?key=$2',
			'embed-width' : '540',
			'embed-height' : '380',
		  },
		  {
			'title' : 'Sharkle',
			'website' : 'http://www.sharkle.com',
			'url-match' : '(http://(?:www\.)?sharkle\.com/externalPlayer/(?:(?:(?:[0-9a-z]{1,25})/){3}))',
			'embed-src' : '$2',
			'embed-width' : '340',
			'embed-height' : '310',
		  },
		  {
			'title' : 'Smotri',
			'website' : 'http://www.smotri.com',
			'url-match' : 'http://(?:www\.)?smotri\.com/video/view/\\?id=v([0-9a-f]{10})',
			'embed-src' : 'http://pics.smotri.com/scrubber_custom8.swf?file=$2&bufferTime=3&autoStart=false&str_lang=eng&xmlsource=http%3A%2F%2Fpics.smotri.com%2Fcskins%2Fblue%2Fskin_color_lightaqua.xml&xmldatasource=http%3A%2F%2Fpics.smotri.com%2Fskin_ng.xml',
			'embed-width' : '400',
			'embed-height' : '330',
		  },
		  {
			'title' : 'Snotr',
			'website' : 'http://www.snotr.com',
			'url-match' : 'http://(?:www\.|videos\.)?snotr\.com/(?:player\.swf\\?video=|)?(?:video|embed)/([0-9]{1,8})',
			'embed-src' : 'http://videos.snotr.com/player.swf?video=$2&amp;embedded=true&amp;autoplay=false',
			'embed-width' : '400',
			'embed-height' : '330',
		  },
		  {
			'title' : 'SouthPark Studios',
			'website' : 'http://www.southparkstudios.com',
			'url-match' : 'http://(?:www\.)?southparkstudios\.com/clips/([0-9]{1,10})',
			'embed-src' : 'http://media.mtvnservices.com/mgid:cms:item:southparkstudios.com:$2:',
			'embed-width' : '480',
			'embed-height' : '360',
		  },
		  {
			'title' : 'Space.tv.cctv.com',
			'website' : 'http://space.tv.cctv.com',
			'url-match' : 'http://((?:(?:[a-z0-9]{1,10})\.){0,2})?cctv\.com/act/video\.jsp\\?videoId=VIDE([0-9]{16})',
			'embed-src' : 'http://$2cctv.com/playcfg/player_new.swf?id=VIDE$3&site=http://$2cctv.com&method=http',
			'embed-width' : '500',
			'embed-height' : '400',
		  },
		  {
			'title' : 'Spike',
			'website' : 'http://www.spike.com',
			'url-match' : 'http://(?:www\.)?spike\.com/(?:video/(?:[0-9a-z_-]{2,30})?/|efp\\?flvbaseclip=)([0-9]{4,12})',
			'embed-src' : 'http://www.spike.com/efp?flvbaseclip=$2&',
			'embed-width' : '448',
			'embed-height' : '365',
		  },
		  {
			'title' : 'Songza',
			'website' : 'http://www.songza.com',
			'url-match' : '(http://(?:www\.)?songza\.com/e/listen\\?(?:zName=(?:[0-9a-z_\%-]*?)&(?:amp;)?)?zId=(?:[0-9a-z_-]{16}))',
			'embed-src' : '$2&zAutostart=false&zType=flv',
			'embed-width' : '425',
			'embed-height' : '114',
		  },
		  {
			'title' : 'Streetfire',
			'website' : 'http://www.streetfire.net',
			'url-match' : 'http://(?:www\.|videos\.)?streetfire\.net/video/(?:[0-9a-z\-_]*)\.htm',
			'fetch-match' : '<link rel="video_src" href="([A-z:\/\.0-9-_=?]*)',
			'embed-src' : '$2',
			'embed-width' : '428',
			'embed-height' : '352',
		  },
		  {
			'title' : 'StupidVideos',
			'website' : 'http://www.stupidvideos.com',
			'url-match' : 'http://(?:www\.|images\.)?stupidvideos\.com/(?:video/(?:[^"\#]*?)\#|images/player/player\.swf\\?sa=1&(?:amp;)?sk=7&(?:amp;)?si=2&(?:amp;)?i=)([0-9]{1,10})',
			'embed-src' : 'http://images.stupidvideos.com/2.0.2/swf/video.swf?sa=1&sk=7&si=2&i=$2',
			'embed-width' : '451',
			'embed-height' : '433',
		  },
		  {
			'title' : 'TagTélé',
			'website' : 'http://www.tagtele.com',
			'url-match' : 'http://www\.tagtele\.com/(?:v/|videos/voir/)([0-9]{1,12})',
			'embed-src' : 'http://www.tagtele.com/v/$2',
			'embed-width' : '425',
			'embed-height' : '350',
		  },
		  {
			'title' : 'Ted.com',
			'website' : 'http://www.ted.com',
			'url-match' : 'http://(?:www\.)?ted\.com/(index.php/)?talks/[a-z0-9\-_]*.html',
			'fetch-match' : 'hs:"talks\/dynamic\/([a-z0-9-_]*)-high\.flv',
			'embed-src' : 'http://video.ted.com/assets/player/swf/EmbedPlayer.swf',
			'embed-width' : '446',
			'embed-height' : '326',
			'flashvars' : 'vu=http://video.ted.com/talks/dynamic/$2-medium.flv&su=http://images.ted.com/images/ted/tedindex/embed-posters/$2.embed_thumbnail.jpg&vw=432&vh=240',
		  },
		  {
			'title' : 'The Onion',
			'website' : 'http://www.theonion.com',
			'url-match' : 'http://(?:www\.)?theonion\.com/content/video/.*',
			'fetch-match' : 'videoid\s?=\s?"([0-9]{2,7})";.*var image_url\s?=\s?escape\\("([^"]*)"',
			'embed-src' : 'http://www.theonion.com/content/themes/common/assets/onn_embed/embedded_player.swf?image=$3&amp;videoid=$2',
			'embed-width' : '480',
			'embed-height' : '430',
		  },
		  {
			'title' : 'TinyPic',
			'website' : 'http://www.tinypic.com',
			'url-match' : 'http://(?:www\.)?tinypic\.com/player\.php\\?v=([0-9a-z-&=]{1,12})',
			'embed-src' : 'http://v5.tinypic.com/player.swf?file=$2',
			'embed-width' : '440',
			'embed-height' : '420',
		  },
		  {
			'title' : 'Todays Big Thing',
			'website' : 'http://www.todaysbigthing.com',
			'url-match' : 'http://(?:www|entertainment|sports|technology|music|funnyvideos)\.todaysbigthing\.com/[0-9]{4}(?:/[0-9]{2}){2}',
			'fetch-match' : 'http://(?:www|entertainment|sports|technology|music|funnyvideos)\.todaysbigthing\.com/betamax/betamax\.internal\.swf\\?item_id=([0-9]{1,6})',
			'embed-src' : 'http://www.todaysbigthing.com/betamax/betamax.swf?item_id=$2&fullscreen=1',
			'embed-width' : '480',
			'embed-height' : '360',
		  },
		  {
			'title' : 'TrailerAddict',
			'website' : 'http://www.traileraddict.com',
			'url-match' : 'http://(?:www\.)?traileraddict\.com/trailer/',
			'fetch-match' : '(http://(?:www\.)?traileraddict\.com/em(?:d|b)/(?:[0-9]{1,10}))',
			'embed-src' : '$2',
			'embed-width' : '450',
			'embed-height' : '279',
		  },
		  {
			'title' : 'TrTube',
			'website' : 'http://www.trtube.com',
			'url-match' : 'http://(?:www\.)?trtube\.com/izle\.php\\?v=([a-z]{1,12})',
			'embed-src' : 'http://www.trtube.com/mediaplayer_3_15.swf?file=http://www.trtube.com/vid2/89457.flv&image=http://www.trimg.com/vi/89457.gif&autostart=false',
			'embed-width' : '425',
			'embed-height' : '350',
		  },
		  {
			'title' : 'Trilulilu',
			'website' : 'http://www.trilulilu.ro',
			'url-match' : 'http://(?:www\.)?trilulilu\.ro/([0-9a-z_-]*?)/([0-9a-f]{14})',
			'fetch-match' : '<link rel="video_src" href="([A-z:\/\.0-9-_=?]*)\\?autoplay', 
			'embed-src' : '$2',
			'embed-width' : '440',
			'embed-height' : '362',
		  },
		  {
			'title' : 'Tu',
			'website' : 'http://www.tu.tv',
			'title' : 'Tu.tv',
			'url-match' : '(http://tu\.tv/tutvweb\.swf\\?xtp=(?:[0-9]{1,10}))',
			'embed-src' : '$2',
			'embed-width' : '425',
			'embed-height' : '350',
		  },
		  {
			'title' : 'Tudou',
			'website' : 'http://www.tudou.com',
			'url-match' : 'http://(?:www\.)?tudou\.com/(?:programs/view/|v/)([a-z0-9-]{1,12})',
			'embed-src' : 'http://www.tudou.com/v/$2',
			'embed-width' : '400',
			'embed-height' : '300',
		  },
		  {
			'title' : 'Tumblr (Music)',
			'website' : 'http://www.tumblr.com',
			'url-match' : 'http://[a-z0-9-_]{2,30}\.tumblr\.com/post/[0-9]{3,10}/',
			'fetch-match' : '<embed type="application/x-shockwave-flash" src="(http://[a-z0-9-_./]*\\?audio_file=http://www\.tumblr\.com/audio_file/[0-9]{5,8}/[a-z0-9]{24})',
			'embed-src' : '$2&amp;color=e4e4e4',
			'embed-width' : '207',
			'embed-height' : '27',
		  },
		  {
			'title' : 'Twitvid',
			'website' : 'http://www.twitvid.com/',
			'url-match' : 'http://(?:www\.)?twitvid\.com/([0-9a-z]{1,10})',
			'embed-src' : 'http://www.twitvid.com/player/$2',
			'embed-width' : '425',
			'embed-height' : '344',
		  },
		  {
			'title' : 'UOL VideoLog',
			'website' : 'http://videolog.uol.com.br',
			'url-match' : 'http://videolog\.uol\.com\.br/video(?:\\?|\.php\\?id=)([0-9]{1,9})',
			'embed-src' : 'http://www.videolog.tv/swfs/externo_api.swf?v=$2&amp;id_video=$2',
			'embed-width' : '512',
			'embed-height' : '384',
		  },
		  {
			'title' : 'u-Tube',
			'website' : 'http://www.u-tube.ru',
			'url-match' : 'http://(?:www\.)?u-tube\.ru/(?:playlist\.php\\?id=|pages/video/)([0-9]{1,12})',
			'embed-src' : 'http://www.u-tube.ru/upload/others/flvplayer.swf?file=http://www.u-tube.ru/playlist.php?id=$2&width=400&height=300',
			'embed-width' : '400',
			'embed-height' : '300',
		  },
		  {
			'title' : 'VideoJug',
			'website' : 'http://www.videojug.com',
			'url-match' : 'http://(?:www\.)videojug\.com/film/',
			'fetch-match' : 'http:\/\/www.videojug.com\/player\/videoJugPlayer.swf\\?id=((?:[0-9a-f]{1,12}-?){5})',
			'embed-src' : 'http://www.videojug.com/views/player/Player.swf',
			'embed-width' : '400',
			'embed-height' : '345',
			'flashvars' : 'embedded=true&amp;ClientType=0&amp;id=$2&amp;type=film&amp;host=http%3a%2f%2fwww.videojug.com&amp;ar=16_9',
		  },
		  {
			'title' : 'videos.sapo',
			'website' : 'http://videos.sapo.pt',
			'url-match' : 'http://(www\.|(?:(?:(?:[0-9a-z]{3,12})\.){1,2}))?sapo\.pt/([0-9a-z]{20})',
			'embed-src' : 'http://$2sapo.pt/play?file=http://$2sapo.pt/$3/mov/1',
			'embed-width' : '400',
			'embed-height' : '322',
		  },
		  {
			'title' : 'Vidiac',
			'website' : 'http://www.vidiac.com',
			'url-match' : 'http://(?:www\.)?vidiac\.com/video/((?:[0-9a-z]{8})(?:(?:-(?:[0-9a-z]{4})){3})-(?:[0-9a-z]{12}))\.htm',
			'embed-src' : 'http://www.vidiac.com/vidiac.swf?video=$2',
			'embed-width' : '428',
			'embed-height' : '352',
		  },
		  {
			'title' : 'Viddler',
			'website' : 'http://www.viddler.com',
			'url-match' : '(http://www\.viddler\.com/(?:player|simple)/(?:[0-9a-f]{8})/)',
			'embed-src' : '$2',
			'embed-width' : '437',
			'embed-height' : '288',
		  },
		  {
			'title' : 'Videa',
			'website' : 'http://www.videa.hu',
			'url-match' : 'http://(?:www\.)?videa\.hu/(?:(?:[^"]*)-|flvplayer\.swf\\?v=)([0-9a-z]{16})',
			'embed-src' : 'http://videa.hu/flvplayer.swf?v=$2',
			'embed-width' : '434',
			'embed-height' : '357',
		  },
		  {
			'title' : 'VidiLife',
			'website' : 'http://www.vidilife.com',
			'url-match' : '(http://(?:www\.)?vidilife\.com/flash/flvplayer\.swf\\?xml=http://(?:www\.)?vidilife\.com/media/play_flash_xml\.cfm\\?id=(?:[0-9a-f]{8})-(?:[0-9a-f]{4})-(?:[0-9a-f]{4})-(?:[0-9a-f]{4})-(?:[0-9a-f]{1}))',
			'embed-src' : '$2',
			'embed-width' : '445',
			'embed-height' : '363',
		  },
		  {
			'title' : 'VidMax',
			'website' : 'http://www.vidmax.com',
			'url-match' : 'http://(www\.)?vidmax\.com/(?:index\.php/)?videos?/(?:view/)?([0-9]{1,10})',
			'embed-src' : 'http://www.vidmax.com/player.swf',
			'embed-width' : '400',
			'embed-height' : '300',
			'flashvars' : 'file=http://www.vidmax.com/media/video/$3.flv&amp;streamer=lighttpd&amp;autostart=false&amp;stretching=fill'
		  },
		  {
			'title' : 'Vidivodo',
			'website' : 'http://www.vidivodo.com',
			'url-match' : 'http://www\.vidivodo\.com/VideoPlayerShare\.swf\\?lang=([0-9a-z]*?)&(?:amp;)?vidID=([0-9]*?)&(?:amp;)?vCode=v([0-9]*?)&(?:amp;)?dura=([0-9]*?)&(?:amp;)?File=(?:http://video(?:[0-9]*?)\.vidivodo\.com/)?(vidservers/server(?:[0-9]*?)/videos/(?:[0-9]{4})/(?:[0-9]{2})/(?:[0-9]{2})/(?:[0-9]*?)/v(?:[0-9]*?)\.flv)',
			'embed-src' : 'http://www.vidivodo.com/VideoPlayerShare.swf?lang=$2&vidID=$3&vCode=v$4&dura=$5&File=$6',
			'embed-width' : '425',
			'embed-height' : '343',
		  },
		  {
			'title' : 'VoiceThread',
			'website' : 'http://www.voicethread.com',
			'url-match' : 'http://(?:www\.)?voicethread\.com/(?:share/|book\.swf\\?b=|#q\.b)([0-9]{1,10})',
			'embed-src' : 'http://www.voicethread.com/book.swf?b=$2',
			'embed-width' : '480',
			'embed-height' : '360',
		  },
		  {
			'title' : 'VSocial (Type1)',
			'website' : 'http://www.vsocial.com/vsandbox/',
			'url-match' : 'http://(?:www\.|static\.)?vsocial\.com/(?:video/|flash/ups\.swf)\\?d=([0-9]{1,8})',
			'embed-src' : 'http://static.vsocial.com/flash/ups.swf?d=$2&a=0',
			'embed-width' : '410',
			'embed-height' : '400',
		  },
		  {
			'title' : 'VSocial (Type2)',
			'website' : 'http://www.vsocial.com/vsandbox/',
			'url-match' : '(http://(?:www\.)?vsocial\.com/ups/(?:[a-f0-9]{32}))',
			'embed-src' : '$2',
			'embed-width' : '410',
			'embed-height' : '400',
		  },
		  {
			'title' : 'WeGame',
			'website' : 'http://www.wegame.com',
			'url-match' : 'http://(?:www\.)?wegame\.com/watch/([0-9a-z_-]*?)/',
			'embed-src' : 'http://wegame.com/static/flash/player2.swf?tag=$2',
			'embed-width' : '480',
			'embed-height' : '387',
		  },
		  {
			'title' : 'Webshots (Slideshows)',
			'website' : 'http://www.webshots.com',
			'url-match' : 'http://[a-z0-9\-_]*\.webshots\.com/slideshow/([a-z0-9]*)',
			'embed-src' : 'http://p.webshots.com/flash/smallslideshow.swf',
			'embed-width' : '425',
			'embed-height' : '384',
			'flashvars' : 'playList=http%3A%2F%2Fcommunity.webshots.com%2Fslideshow%2Fmeta%2F$2%3Finline%3Dtrue&inlineUrl=http%3A%2F%2Fcommunity.webshots.com%2FinlinePhoto%26src%3Ds%26referPage%3Dhttp%3A%2F%2Fgood-times.webshots.com%2Fslideshow%2F$2&postRollContent=http%3A%2F%2Fp.webshots.com%2Fflash%2Fws_postroll.swf&shareUrl=http%3A%2F%2Fgood-times.webshots.com%2Fslideshow%2F$2&audio=on&audioVolume=33&autoPlay=false&transitionSpeed=5&startIndex=0&panzoom=on&deployed=true',
		  },
		  {
			'title' : 'Yahoo Video',
			'website' : 'http://video.yahoo.com',
			'url-match' : 'http://(?:(?:www|uk|fr|it|es|br|au|mx|de|ca)\.)?video\.yahoo\.com/watch/([0-9]{1,12})/([0-9]{1,12})',
			'embed-src' : 'http://d.yimg.com/static.video.yahoo.com/yep/YV_YEP.swf?ver=2.1.15',
			'embed-width' : '512',
			'embed-height' : '322',
			'flashvars' : 'id=$3&vid=$2&lang=en-us&intl=us&embed=1'
		  },
		  {
			'title' : 'Yahoo Video HK',
			'website' : 'http://hk.video.yahoo.com',
			'url-match' : 'http://(?:w\.video\.)?hk\.video\.yahoo\.(?:com|net)/video/(?:dplayer\.html\\?vid=|video\.html\\?id=)([0-9]{1,10})',
			'embed-src' : 'http://w.video.hk.yahoo.net/video/dplayer.html?vid=$2',
			'embed-width' : '420',
			'embed-height' : '370',
		  },
		  {
			'title' : 'Yahoo Music Videos',
			'website' : 'http://music.yahoo.com',
			'url-match' : 'http://(?:new\.)?(?:(?:uk|fr|it|es|br|au|mx|de|ca)\.)?music\.yahoo\.com/[^0-9]*([0-9]{1,12})$',
			'embed-src' : 'http://d.yimg.com/cosmos.bcst.yahoo.com/up/fop/embedflv/swf/fop.swf?id=v$2&eID=0000000&lang=us&enableFullScreen=0&shareEnable=1',
			'embed-width' : '400',
			'embed-height' : '255',
		  },
		  {
			'title' : 'YouKu',
			'website' : 'http://www.youku.com',
			'url-match' : 'http://(?:v\.youku\.com/v_show/id_|player\.youku\.com/player\.php/sid/)([0-9a-z]{6,14})',
			'embed-src' : 'http://player.youku.com/player.php/sid/$2=/v.swf',
			'embed-width' : '450',
			'embed-height' : '372',
		  },
		  {
			'title' : 'You.Video.Sina.com.cn',
			'website' : 'http://you.video.sina.com.cn',
			'url-match' : 'http://(?:vhead\.blog|you\.video)\.sina\.com\.cn/(?:player/(?:[^"]*?)vid=|b/)([0-9]{5,12})(?:-|&(?:amp;)?uid=)([0-9]{5,12})',
			'embed-src' : 'http://vhead.blog.sina.com.cn/player/outer_player.swf?auto=0&vid=$2&uid=$3',
			'embed-width' : '480',
			'embed-height' : '370',
		  }
		];
		for (var stubKey in AutoEmbed_stubs) {
			var stub = AutoEmbed_stubs[stubKey];
			var regExp = new RegExp(stub['url-match'], "im");
			var match = url.match(regExp);
			if (match) {
				self._stub = stub;

				if (stub['fetch-match']) {
					return _parseLink(url);
				} else {
					self._media_id = match;
					_setDefaultParams();
					return true;
				}
			}
		}

		delete(stub);
		return false;
	};

	this.getStub = function (property) {
		if (typeof property === "undefined") {
			property = null;
		}

		return property ? self._stub[property] : self._stub;
	};

	this.getObjectParams = function () {
		return self._object_params;
	};

	this.getObjectAttribs = function () {
		return self._object_attribs;
	};

	this.getEmbedCode = function () {
		if (self._stub['iframe-player']) {
			return _buildiFrame();
		}
		return _buildObject();
	};

	this.getImageURL = function () {
		if (!self._stub['image-src']) return false;

		var thumb = self._stub['image-src'];
		for (var i = 1; i <= self._media_id.length; i++) {
			thumb = thumb.replace('$' + i, self._media_id[i - 1]);
		}

		return thumb;
	};

	this.setHeight = function (height) {
		return this.setObjectAttrib('height', height);
	};

	this.setWidth = function (width) {
		return this.setObjectAttrib('width', width);
	};

	this.setParam = function (param, value) {
		if (typeof value === "undefined") {
			value = null;
		}

		return this.setObjectParam(param, value);
	};

	this.setObjectParam = function (param, value) {
		if (typeof value === "undefined") {
			value = null;
		}

		if (self._object_params instanceof Array) return false;

		if (param instanceof Array) {
			for (var p in param) {
				self._object_params[p] = param[p];
			}
		} else {
			self._object_params[param] = value;
		}

		return true;
	};

	this.setObjectAttrib = function (param, value) {
		if (typeof value === "undefined") {
			value = null;
		}

		if (self._object_attribs instanceof Array) {
			return false;
		}

		if (param instanceof Array) {
			for (var p in param) {
				self._object_attribs[p] = param[p];
			}
		} else {
			self._object_attribs[param] = value;
		}

		return true;
	};

	function _parseLink(url) {
		//FIXME: This is a file read operation. Need to figure out how to achieve this in javascript
		//API doc: http://in1.php.net/manual/en/function.file-get-contents.php
		//var source = file_get_contents(url).replace('/[^(\x20-\x7F)]*/', '');
		var source = url.replace('/[^(\x20-\x7F)]*/', '');

		var regExp = new RegExp(self._stub['fetch-match'], "im");
		var match = source.match(regExp);
		if (match) {
			self._media_id = match;
			_setDefaultParams();
			return true;
		}

		return false;
	}

	function _buildObject() {
		var object_attribs = '';
		var object_params = '';

		for (var param in self._object_attribs) {
			var value = self._object_attribs[param];
			object_attribs += '  ' + param + '="' + value + '"';
		}

		for (var param in self._object_params) {
			var value = self._object_params[param];
			object_params += '<param name="' + param + '" value="' + value + '" />';
		}

		str = "<object " + object_attribs + "> " + object_params + " " + AutoEmbed.AE_TAG + "</object>"

		for (var i = 1; i <= self._media_id.length; i++) {
			str = str.replace('$' + i, self._media_id[i - 1]);
		}

		return str;
	}

	function _buildiFrame() {
		var source = self._stub['iframe-player'];

		for (var i = 1; i <= self._media_id.length; i++) {
			source = source.replace('$' + i, self._media_id[i - 1]);
		}

		var width = self._object_attribs['width'];
		var height = self._object_attribs['height'];

		return '<iframe type="text/html" width="' + width + '" height="' + height + '" src="' + source + '" frameborder="0"></iframe>';
	}

	function _setDefaultParams() {

		var source = self._stub['embed-src'];

		for (var i = 1; i <= self._media_id.length; i++) {
			source = source.replace('$' + i, self._media_id[i - 1]);
		}

		var flashvars = self._stub['flashvars'] ? self._stub['flashvars'] : null;

		for (var i = 1; i <= self._media_id.length; i++) {
			source = source.replace(new RegExp('$' + i, 'gim'), self._media_id[i - 1]);
			flashvars = flashvars == null ? null : flashvars.replace(new RegExp('$' + i, 'gim'), self._media_id[i - 1]);
		}

		source = htmlspecialchars(source);
		flashvars = flashvars == null ? null : htmlspecialchars(flashvars);

		self._object_params = {
			'movie': source,
			'quality': 'high',
			'allowFullScreen': 'true',
			'allowScriptAccess': 'always',
			'pluginspage': 'http://www.macromedia.com/go/getflashplayer',
			'autoplay': 'false',
			'autostart': 'false',
			'flashvars': flashvars,
		};

		self._object_attribs = {
			'type': 'application/x-shockwave-flash',
			'data': source,
			'width': self._stub['embed-width'],
			'height': self._stub['embed-height']
		};
	}
};
tinymce.PluginManager.add('nt_media', function(editor, url) {
	var urlPatterns = [
		{regex: /youtu\.be\/([a-z1-9.-_]+)/, type: 'iframe', w: 425, h: 350, url: 'http://www.youtube.com/embed/$1'},
		{regex: /youtube\.com(.+)v=([^&]+)/, type: 'iframe', w: 425, h: 350, url: 'http://www.youtube.com/embed/$2'},
		{regex: /vimeo\.com\/([0-9]+)/, type: 'iframe', w: 425, h: 350, url: 'http://player.vimeo.com/video/$1?title=0&byline=0&portrait=0&color=8dc7dc'},
		{regex: /maps\.google\.([a-z]{2,3})\/maps\/(.+)msid=(.+)/, type: 'iframe', w: 425, h: 350, url: 'http://maps.google.com/maps/ms?msid=$2&output=embed"'}
	];

	function guessMime(url) {
		if (url.indexOf('.mp3') != -1) {
			return 'audio/mpeg';
		}

		if (url.indexOf('.wav') != -1) {
			return 'audio/wav';
		}

		if (url.indexOf('.mp4') != -1) {
			return 'video/mp4';
		}

		if (url.indexOf('.webm') != -1) {
			return 'video/webm';
		}

		if (url.indexOf('.ogg') != -1) {
			return 'video/ogg';
		}

		if (url.indexOf('.swf') != -1) {
			return 'application/x-shockwave-flash';
		}

		return '';
	}

	function showDialog() {
		var win, width, height, data;

		function recalcSize(e) {
			var widthCtrl, heightCtrl, newWidth, newHeight;

			widthCtrl = win.find('#width')[0];
			heightCtrl = win.find('#height')[0];

			newWidth = widthCtrl.value();
			newHeight = heightCtrl.value();

			if (win.find('#constrain')[0].checked() && width && height && newWidth && newHeight) {
				if (e.control == widthCtrl) {
					newHeight = Math.round((newWidth / width) * newHeight);
					heightCtrl.value(newHeight);
				} else {
					newWidth = Math.round((newHeight / height) * newWidth);
					widthCtrl.value(newWidth);
				}
			}

			width = newWidth;
			height = newHeight;
		}

		data = getData(editor.selection.getNode());
		width = data.width;
		height = data.height;

		win = editor.windowManager.open({
			title: 'Insert/edit video',
			data: data,
			bodyType: 'tabpanel',
			body: [
				{
					title: 'General',
					type: "form",
					onShowTab: function() {
						this.fromJSON(htmlToData(this.next().find('#embed').value()));
					},
					items: [
						{name: 'source1', type: 'filepicker', filetype: 'media', size: 40, autofocus: true, label: 'Source'},
						{name: 'source2', type: 'filepicker', filetype: 'media', size: 40, label: 'Alternative source'},
						{name: 'poster', type: 'filepicker', filetype: 'image', size: 40, label: 'Poster'},
						{
							type: 'container',
							label: 'Dimensions',
							layout: 'flex',
							direction: 'row',
							align: 'center',
							spacing: 5,
							items: [
								{name: 'width', type: 'textbox', maxLength: 3, size: 3, onchange: recalcSize},
								{type: 'label', text: 'x'},
								{name: 'height', type: 'textbox', maxLength: 3, size: 3, onchange: recalcSize},
								{name: 'constrain', type: 'checkbox', checked: true, text: 'Constrain proportions'}
							]
						}
					]
				},

				{
					title: 'Embed',
					type: "panel",
					layout: 'flex',
					direction: 'column',
					align: 'stretch',
					padding: 10,
					spacing: 10,
					onShowTab: function() {
						this.find('#embed').value(dataToHtml(this.parent().toJSON()));
					},
					items: [
						{
							type: 'label',
							text: 'Paste your embed code below:'
						},
						{
							type: 'textbox',
							flex: 1,
							name: 'embed',
							value: getSource(),
							multiline: true,
							label: 'Source'
						}
					]
				}
			],
			onSubmit: function() {
				editor.insertContent(dataToHtml(this.toJSON()));
			}
		});
	}

	function getSource() {
		var elm = editor.selection.getNode();

		if (elm.getAttribute('data-mce-object')) {
			return editor.selection.getContent();
		}
	}

	function dataToHtml(data) {
		var html = '';

		if (!data.source1) {
			tinymce.extend(data, htmlToData(data.embed));
			if (!data.source1) {
				return '';
			}
		}

		data.source1 = editor.convertURL(data.source1, "source");
		data.source2 = editor.convertURL(data.source2, "source");
		data.source1mime = guessMime(data.source1);
		data.source2mime = guessMime(data.source2);
		data.poster = editor.convertURL(data.poster, "poster");
		data.flashPlayerUrl = editor.convertURL(url + '/moxieplayer.swf', "movie");

		if (data.embed) {
			html = updateHtml(data.embed, data, true);
		} else {
			// permet d'utiliser "autoembed"
			try{
				var ae = new AutoEmbed();
				var res = ae.parseUrl(data.source1);
				if(res !== false)
					return ae.getEmbedCode();
			}catch(e){}

			tinymce.each(urlPatterns, function(pattern) {
				var match, i, url;

				if ((match = pattern.regex.exec(data.source1))) {
					url = pattern.url;

					for (i = 0; match[i]; i++) {
						/*jshint loopfunc:true*/
						url = url.replace('$' + i, function() {
							return match[i];
						});
					}

					data.source1 = url;
					data.type = pattern.type;
					data.width = pattern.w;
					data.height = pattern.h;
				}
			});
			data.width = data.width || 300;
			data.height = data.height || 150;

			tinymce.each(data, function(value, key) {
				data[key] = editor.dom.encode(value);
			});

			if (data.type == "iframe") {
				html += '<iframe src="' + data.source1 + '" width="' + data.width + '" height="' + data.height + '"></iframe>';
			} else if (data.source1mime == "application/x-shockwave-flash") {
				html += '<object data="' + data.source1 + '" width="' + data.width + '" height="' + data.height + '" type="application/x-shockwave-flash">';

				if (data.poster) {
					html += '<img src="' + data.poster + '" width="' + data.width + '" height="' + data.height + '" />';
				}

				html += '</object>';
			} else if (data.source1mime.indexOf('audio') != -1) {
				if (editor.settings.audio_template_callback) {
					html = editor.settings.audio_template_callback(data);
				} else {
					html += (
						'<audio controls="controls" src="' + data.source1 + '">' +
							(data.source2 ? '\n<source src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' />\n' : '') +
						'</audio>'
					);
				}
			} else {
				if (editor.settings.video_template_callback) {
					html = editor.settings.video_template_callback(data);
				} else {
					html = (
						'<video width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' +
							'<source src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />\n' +
							(data.source2 ? '<source src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' />\n' : '') +
						'</video>'
					);
				}
			}
		}

		return html;
	}

	function htmlToData(html) {
		var data = {};

		new tinymce.html.SaxParser({
			validate: false,
			special: 'script,noscript',
			start: function(name, attrs) {
				if (!data.source1 && name == "param") {
					data.source1 = attrs.map.movie;
				}

				if (name == "iframe" || name == "object" || name == "embed" || name == "video" || name == "audio") {
					data = tinymce.extend(attrs.map, data);
				}

				if (name == "source") {
					if (!data.source1) {
						data.source1 = attrs.map.src;
					} else if (!data.source2) {
						data.source2 = attrs.map.src;
					}
				}

				if (name == "img" && !data.poster) {
					data.poster = attrs.map.src;
				}
			}
		}).parse(html);

		data.source1 = data.source1 || data.src || data.data;
		data.source2 = data.source2 || '';
		data.poster = data.poster || '';

		return data;
	}

	function getData(element) {
		if (element.getAttribute('data-mce-object')) {
			return htmlToData(editor.serializer.serialize(element, {selection: true}));
		}

		return {};
	}

	function updateHtml(html, data, updateAll) {
		var writer = new tinymce.html.Writer();
		var sourceCount = 0, hasImage;

		function setAttributes(attrs, updatedAttrs) {
			var name, i, value, attr;

			for (name in updatedAttrs) {
				value = "" + updatedAttrs[name];

				if (attrs.map[name]) {
					i = attrs.length;
					while (i--) {
						attr = attrs[i];

						if (attr.name == name) {
							if (value) {
								attrs.map[name] = value;
								attr.value = value;
							} else {
								delete attrs.map[name];
								attrs.splice(i, 1);
							}
						}
					}
				} else if (value) {
					attrs.push({
						name: name,
						value: value
					});

					attrs.map[name] = value;
				}
			}
		}

		new tinymce.html.SaxParser({
			validate: false,
			special: 'script,noscript',

			comment: function(text) {
				writer.comment(text);
			},

			cdata: function(text) {
				writer.cdata(text);
			},

			text: function(text, raw) {
				writer.text(text, raw);
			},

			start: function(name, attrs, empty) {
				switch (name) {
					case "video":
					case "object":
					case "img":
					case "iframe":
						setAttributes(attrs, {
							width: data.width,
							height: data.height
						});
					break;
				}

				if (updateAll) {
					switch (name) {
						case "video":
							setAttributes(attrs, {
								poster: data.poster,
								src: ""
							});

							if (data.source2) {
								setAttributes(attrs, {
									src: ""
								});
							}
						break;

						case "iframe":
							setAttributes(attrs, {
								src: data.source1
							});
						break;

						case "source":
							sourceCount++;

							if (sourceCount <= 2) {
								setAttributes(attrs, {
									src: data["source" + sourceCount],
									type: data["source" + sourceCount + "mime"]
								});

								if (!data["source" + sourceCount]) {
									return;
								}
							}
						break;

						case "img":
							if (!data.poster) {
								return;
							}

							hasImage = true;
							break;
					}
				}

				writer.start(name, attrs, empty);
			},

			end: function(name) {
				if (name == "video" && updateAll) {
					for (var index = 1; index <= 2; index++) {
						if (data["source" + index]) {
							var attrs = [];
							attrs.map = {};

							if (sourceCount < index) {
								setAttributes(attrs, {
									src: data["source" + index],
									type: data["source" + index + "mime"]
								});

								writer.start("source", attrs, true);
							}
						}
					}
				}

				if (data.poster && name == "object" && updateAll && !hasImage) {
					var imgAttrs = [];
					imgAttrs.map = {};

					setAttributes(imgAttrs, {
						src: data.poster,
						width: data.width,
						height: data.height
					});

					writer.start("img", imgAttrs, true);
				}

				writer.end(name);
			}
		}, new tinymce.html.Schema({})).parse(html);

		return writer.getContent();
	}

	editor.on('ResolveName', function(e) {
		var name;

		if (e.target.nodeType == 1 && (name = e.target.getAttribute("data-mce-object"))) {
			e.name = name;
		}
	});

	editor.on('preInit', function() {
		// Make sure that any messy HTML is retained inside these
		var specialElements = editor.schema.getSpecialElements();
		tinymce.each('video audio iframe object'.split(' '), function(name) {
			specialElements[name] = new RegExp('<\/' + name + '[^>]*>','gi');
		});

		// Allow elements
		editor.schema.addValidElements('object[id|style|width|height|classid|codebase|*],embed[id|style|width|height|type|src|*],video[*],audio[*]');

		// Set allowFullscreen attribs as boolean
		var boolAttrs = editor.schema.getBoolAttrs();
		tinymce.each('webkitallowfullscreen mozallowfullscreen allowfullscreen'.split(' '), function(name) {
			boolAttrs[name] = {};
		});

		// Converts iframe, video etc into placeholder images
		editor.parser.addNodeFilter('iframe,video,audio,object,embed', function(nodes, name) {
			var i = nodes.length, ai, node, placeHolder, attrName, attrValue, attribs, innerHtml;

			while (i--) {
				node = nodes[i];
				placeHolder = new tinymce.html.Node('img', 1);
				placeHolder.shortEnded = true;

				// Prefix all attributes except width, height and style since we
				// will add these to the placeholder
				attribs = node.attributes;
				ai = attribs.length;
				while (ai--) {
					attrName = attribs[ai].name;
					attrValue = attribs[ai].value;

					if (attrName !== "width" && attrName !== "height" && attrName !== "style") {
						if (attrName == "data" || attrName == "src") {
							attrValue = editor.convertURL(attrValue, attrName);
						}

						placeHolder.attr('data-mce-p-' + attrName, attrValue);
					}
				}

				// Place the inner HTML contents inside an escaped attribute
				// This enables us to copy/paste the fake object
				innerHtml = node.firstChild && node.firstChild.value;
				if (innerHtml) {
					placeHolder.attr("data-mce-html", escape(innerHtml));
					placeHolder.firstChild = null;
				}

				placeHolder.attr({
					width: node.attr('width') || "300",
					height: node.attr('height') || (name == "audio" ? "30" : "150"),
					style: node.attr('style'),
					src: tinymce.Env.transparentSrc,
					"data-mce-object": name,
					"class": "mce-object mce-object-" + name
				});

				node.replace(placeHolder);
			}
		});

		// Replaces placeholder images with real elements for video, object, iframe etc
		editor.serializer.addAttributeFilter('data-mce-object', function(nodes, name) {
			var i = nodes.length, node, realElm, ai, attribs, innerHtml, innerNode;

			while (i--) {
				node = nodes[i];
				realElm = new tinymce.html.Node(node.attr(name), 1);

				// Add width/height to everything but audio
				if (node.attr(name) != "audio") {
					realElm.attr({
						width: node.attr('width'),
						height: node.attr('height')
					});
				}

				realElm.attr({
					style: node.attr('style')
				});

				// Unprefix all placeholder attributes
				attribs = node.attributes;
				ai = attribs.length;
				while (ai--) {
					var attrName = attribs[ai].name;

					if (attrName.indexOf('data-mce-p-') === 0) {
						realElm.attr(attrName.substr(11), attribs[ai].value);
					}
				}

				// Inject innerhtml
				innerHtml = node.attr('data-mce-html');
				if (innerHtml) {
					innerNode = new tinymce.html.Node('#text', 3);
					innerNode.raw = true;
					innerNode.value = unescape(innerHtml);
					realElm.append(innerNode);
				}

				node.replace(realElm);
			}
		});

	});

	editor.on('ObjectSelected', function(e) {
		if (e.target.getAttribute('data-mce-object') == "audio") {
			e.preventDefault();
		}
	});

	editor.on('objectResized', function(e) {
		var target = e.target, html;

		if (target.getAttribute('data-mce-object')) {
			html = target.getAttribute('data-mce-html');
			if (html) {
				html = unescape(html);
				target.setAttribute('data-mce-html', escape(
					updateHtml(html, {
						width: e.width,
						height: e.height
					})
				));
			}
		}
	});

	editor.addButton('nt_media', {
		tooltip: 'Insert/edit video',
		onclick: showDialog,
		stateSelector: 'img[data-mce-object=video]'
	});

	editor.addMenuItem('nt_media', {
		icon: 'media',
		text: 'Insert video',
		onclick: showDialog,
		context: 'insert',
		prependToContext: true
	});
});