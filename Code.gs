function onOpen()
{ 
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Apps Script Demo")
    .addItem("💬 Demo help sidebar & chat","helpMenuSb")
    .addSeparator()
    .addItem('📊 Demo Format Sheet', 'formatSheet')
    .addItem('🔁 Reset Sheet', 'resetSheet')
    .addSeparator()
    .addItem('🔗 Apps Script UNLIMITED website', 'openWebSite')
    .addSeparator()
    //.addItem('Menu 2','')
    //.addItem('Menu 3','')
    .addToUi();
}

//load the CSS file
function include(CSSOverride) {
  return HtmlService.createHtmlOutputFromFile(CSSOverride)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .getContent();
}//load the CSS file

//help menu sidebar
function helpMenuSb(){
  loadingToast();
  var html = HtmlService
      .createTemplateFromFile('Help-sidebar')
      .evaluate()
      .setTitle('☎ Help & Support')
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);
}//help menu sidebar

//progress toastie
function loadingToast(){
 SpreadsheetApp.getActiveSpreadsheet().toast("Loading...","",3);
}//progress toastie

//open Apps Script Unlimited website
function openWebSite(){
  openUrl('https://shooshmonkey.com/unlimited');
}

/**
 * Open a URL in a new tab.
 */
function openUrl( url ){
  var html = HtmlService.createHtmlOutput('<html><script>'
  +'window.close = function(){window.setTimeout(function(){google.script.host.close()},9)};'
  +'var a = document.createElement("a"); a.href="'+url+'"; a.target="_blank";'
  +'if(document.createEvent){'
  +'  var event=document.createEvent("MouseEvents");'
  +'  if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1){window.document.body.append(a)}'                          
  +'  event.initEvent("click",true,true); a.dispatchEvent(event);'
  +'}else{ a.click() }'
  +'close();'
  +'</script>'
  // Offer URL as clickable link in case above code fails.
  +'<body style="word-break:break-word;font-family:sans-serif;"><p>Oops...looks like you have popups blocked. <a href="https://support.google.com/chrome/answer/95472" target="_blank" onclick="window.close()">Learn how to enable popups</a> </p>' 
  +'<p><a href="'+url+'" target="_blank" onclick="window.close()">Click here to open a blank form</a>.</p></body>'
  +'<script>google.script.host.setHeight(130);google.script.host.setWidth(410)</script>'
  +'</html>')
  .setWidth( 410 ).setHeight( 1 );
  SpreadsheetApp.getUi().showModalDialog( html, "Opening..." );
}

function showToastMessage(toastMessage,toastTitle,toastDuration){
  SpreadsheetApp.getActiveSpreadsheet().toast(toastMessage, toastTitle, parseInt(toastDuration));
}