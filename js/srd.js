/*this will be where all JS specific to SRD.com shows up*/

/*work pulldown is AJAX driven*/
var followReq;
var workReq;


jQuery(document).ready(function() {
	
	jQuery('#follow').mouseenter(function(){
		if(jQuery(this).find('#follow_list').length) {
			expand(300);
			return;
		}
		jQuery('<div id="follow_list" class="span-6 last"><ul></ul></div>').appendTo(this);
		var d = new Date();
		var start = d.getTime();
		followReq = jQuery.ajax({
		   type: "GET",
		   url: "/wordpress/data/follow.xml",
		   dataType: "xml",
			success: function(xml) {
				jQuery(xml).find('account').each(function(){
					var id = jQuery(this).attr('id');
					var name = jQuery(this).find('name').text();
					var url = jQuery(this).find('url').text();
					jQuery('<li class="items" id="link_'+id+'"></li>').html('<a href="'+url+'">'+name+'</a>').appendTo('#follow_list ul');
				});
				expand(Math.max(0, 300-(d.getTime()-start)))
			}
		})		
	});
		
		jQuery('#follow').mouseleave(function(){
			if(jQuery('#follow').find('#follow_list').length&&followReq) followReq.abort();
			jQuery('#follow_list').toggleClass('expanded', false);
			
		});
		
		
		jQuery('nav .page-item-119').mouseenter(function(){
			if(jQuery(this).find('#work_pullout').length) {
				expand2(300);
				return;
			}
			jQuery('<ul id="work_pullout"><li class="span-5 intro"><h4><a href="/projects">Work &amp; Projects</a></h4><p>I keep myself busy on many different design &amp; technology projects &ndash; here are a few worth noting. <a class="more" href="/projects">See All Work &amp; Projects&hellip;</a></p></li></ul>').appendTo(this);
			var d = new Date();
			var start = d.getTime();
			workReq = jQuery.ajax({
				type: "GET",
				url: "/wordpress/data/work.xml",
				dataType: "xml",
				success: function(xml) {
					jQuery(xml).find('project').each(function(){
						var id = jQuery(this).attr('id');
						var name = jQuery(this).find('name').text();
						var image = jQuery(this).find('image').text();
						var url = jQuery(this).find('url').text();
						jQuery('<li class="span-3 showcase" id="project_'+id+'"></li>').html('<h4><a href="'+url+'">'+name+'</a></h4><a href="'+url+'"><img src="'+image+'" alt="'+name+'" /></a>').appendTo('#work_pullout');
					})
					expand2(Math.max(0, 300-(d.getTime()-start)));
				}
			})
		});

			jQuery('nav .page-item-119').mouseleave(function(){
				if(jQuery('nav .page-item-119').find('#work_pullout').length&&workReq) workReq.abort();
				jQuery('#work_pullout').toggleClass('expanded', false);

			});
		
		
		jQuery(document).ajaxComplete(function(e, xhr, settings) {
			
		  if (settings.url == '/wordpress/data/follow.xml') {
		    console.log(e, xhr);
		  }
		});
		
	});
	


function expand(time) {
	setTimeout("jQuery('#follow_list').toggleClass('expanded', true);", time);
}

function expand2(time) {
	setTimeout("jQuery('#work_pullout').toggleClass('expanded', true);", time);
}