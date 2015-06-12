freshdesk2asana
===============

Create new FreshPlug with the following code:

	<div id="asana2ndline" title="Send To Asana">
	  <div class="content">
	    <div id="a2l_td" style="display:none">{{ticket.description}}</div>
	    <input type="button" id="a2l_submit" value="Send To Asana"/>
	  </div>
	  <div class="error"></div>
	</div>
	<script src="https://github.com/Asana/node-asana/releases/download/v0.9.1/asana-min.js"></script>
	<script src="https://github.com/valentinalexeev/freshdesk2asana/releases/download/v0.1/freshdesk2asana.js"></script>
	<script type="text/javascript">
	  var asanaClient = Asana.Client.create().useBasicAuth(<YOUR_ASANA_API_KEY>);
	  
	  jQuery("input#a2l_submit").click(function() {
	    a2l_createTask(
	      "<YOUR ASANA WORKSPACE NAME>",
	      "<YOUR ASANA PROJECT NAME>",
	      "Freshdesk: {{ticket.subject}}", // task title
	      jQuery("div#a2l_td").text(), // task main text
	      ["<tag>", "<tag1>"], // set tags to these
	      ["{{ticket.url}}"] // add as many comments
	    );
	  });
	</script>