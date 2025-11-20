window.PRIVATE_CHAT_WEBAPP = "https://script.google.com/macros/s/AKfycbx1r9zFSNKOz0A2I9JY8s8w5J9bGtzVoScgo-_Bcakm_ikqwihXDF42-ZSGTMprGdWfug/exec";


close: function(){
box.style.display = "none";
},


sendMessage: function(){
const txt = document.getElementById("pc_input").value.trim();
if(!txt) return;


const token = localStorage.getItem('bermooda_playerToken') || '';
const params = new URLSearchParams();
params.append("action","sendMessage");
params.append("fromId", window.playerId);
params.append("fromName", window.playerName);
params.append("toId", window._chatTarget.id);
params.append("text", txt);
params.append("ts", new Date().toISOString());
params.append("token", token);


// ارسال POST
fetch(PRIVATE_CHAT_WEBAPP, {
method: "POST",
body: params
}).catch(e=>console.warn('sendMessage failed', e));


// نمایش لحظه‌ای در UI
privateChat.appendMsg(txt, true);
document.getElementById("pc_input").value = "";
},


appendMsg: function(text, me){
const box = document.getElementById("pc_messages");
const div = document.createElement("div");
div.className = "private-chat-msg " + (me ? "me" : "other");
div.innerText = text;
box.appendChild(div);
box.scrollTop = box.scrollHeight;
},


loadConversation: function(){
const token = localStorage.getItem('bermooda_playerToken') || '';
const url = PRIVATE_CHAT_WEBAPP +
`?action=fetchConversation&playerA=${encodeURIComponent(window.playerId)}&playerB=${encodeURIComponent(window._chatTarget.id)}&token=${encodeURIComponent(token)}`;


fetch(url)
.then(r=>r.json())
.then(rows=>{
const msgBox = document.getElementById("pc_messages");
msgBox.innerHTML = "";


rows.forEach(r=>{
privateChat.appendMsg(
r.text,
String(r.fromId) === String(window.playerId)
);
});
}).catch(e=>{
console.warn('loadConversation failed', e);
});
}
};


document.getElementById("pc_send").onclick = privateChat.sendMessage;
document.getElementById("pc_input").addEventListener("keydown", e=>{ if(e.key === "Enter") privateChat.sendMessage(); });
})();