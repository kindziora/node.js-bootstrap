<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>websocket crowdguru test</title>
        <link href="bootstrap/css/bootstrap.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="jquery.noty.css"/>
        <link rel="stylesheet" type="text/css" href="noty_theme_default.css"/>
        <style>
            body {padding-top: 60px;}
            h1 {margin:30px 0;}
            .control-label {font-weight:bold;}
            .noty_bar {float:left;}
            textarea{width:55%;}
        </style>
        <script src="jquery-1.7.2.js"></script>
        <script src="jquery.noty.js"></script>
        <script src="g.js"></script>
    </head>
    <body>
        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <a class="brand" href="#">crowdmodul * (node.js+mysql+websockets)</a>
                    <div class="nav-collapse">
                        <ul class="nav">
                            <li class="active"><a href="#1">Einleitung</a></li>
                            <li><a href="#2">proof of concept</a></li>
                            <li><a href="#3">Nutzung im crowdmodul</a></li>
                            <li><a href="#4">Integration</a></li>
                            <li><a href="#5">Code</a></li>
                        </ul>
                    </div><!--/.nav-collapse -->
                </div>
            </div>
        </div>

        <div class="container">
            <a name="1"></a>
            <h1>Einleitung</h1>

            <p>Es wird ein auf node.js basierender websocket Server bereitgestellt.<br/>
                Dadurch bietet sich ein echtzeit Messagingsystem für das crowdmodul.
            </p>

            <h2>node.js 0.8</h2>

            <ul>
                <li><a href="https://www.google.com/search?q=nodejs+performance" target="_blank">performance</a></li>
                <li><a href="https://www.google.de/#hl=de&output=search&sclient=psy-ab&q=does+node+js+scale" target="_blank">skalierbarkeit durch seperaten node.js server</a></li>
                <li><b>dediziertes Serversystem</b> ohne umwege wie bei php</li>
                <li><a href="http://code.google.com/p/v8/" target="_blank">javascript</a> als lingua franca(server und clientseitig)</li>
                <li><a href="https://github.com/felixge/node-mysql" target="_blank">mysql</a></li>
                <li> 
                    <a href="http://socket.io/" target="_blank">socket.io</a>
                    <ul>
                        <li>server und client library</li>
                        <li>!websocket dann fallback auf flash oder !flash dann fallback auf xhr poll</li>
                        <li>bietet komplettes Channel System, Gruppen, Einzelnachrichten, Kanäle, Broadcasting</li>
                    </ul>
                </li>
            </ul>
            <a href="http://en.wikipedia.org/wiki/Node.js" target="_blank">wiki zu node.js</a> | <a href="http://nodejs.org/" target="_blank">node.js webseite</a>

        </div>

        <div class="container">
            <a name="2"></a>
            <h1>proof of concept</h1>

            <form class="form-horizontal">

                <div class="control-group">
                    <label class="control-label" for="input01">User suchen</label>
                    <div class="controls">
                        <input id="input01" name="username" value="" placeholder="Benutzernamen eingeben" />
                        <input type="submit" class="btn" name="testit[1]" value="go" />
                        <p class="help-block">crowdmodul MySQL database durchsuchen nach gurus.</p>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="input02">Broadcast Messages</label>
                    <div class="controls">
                        <input id="input02" name="messagebroadcast" value="" placeholder="Nachricht eingeben" />
                        <input type="submit" class="btn" name="testit[2]" value="go" />
                        <p class="help-block">Broadcast Nachricht an alle verbundenen Crowdmodul Nutzer, außer den Absender.</p>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="input03">Clients anzeigen</label>
                    <div class="controls">
                        <textarea id="input03" name="userlist" placeholder="Hier reinklicken um Benutzer zu laden" ></textarea>
                        <p class="help-block">Alle verbundenen Benutzer anzeigen. Das Resultat wird nicht nur hier angezeigt sondern auch in allen verbundenen Clients aktualisiert sich diese Textarea.</p>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="input04">Messages senden</label>
                    <div class="controls">
                        <input id="input04" name="uname" value="" placeholder="Namen eingeben" />
                        <input id="input04" name="messagetoclient" value="" placeholder="Nachricht eingeben" />
                        <input type="submit" class="btn" name="testit[3]" value="go" />
                        <p class="help-block">An bestimmten Benutzer Message senden.</p>
                    </div>
                </div>   
                <div class="control-group">
                    <label class="control-label" for="input05">Messages an Gruppen</label>
                    <div class="controls">
                        <input id="group" name="group" value="" placeholder="Gruppe eingeben" />
                        <input id="input05" name="messagetoclient" value="" placeholder="Nachricht eingeben" />
                        <input type="submit" class="btn" name="testit[4]" value="go" />
                        <p class="help-block">An bestimmte Benutzergruppen z.b Admins oder nur gurus Message senden.</p>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="input05">u.s.w</label>
                    <div class="controls">
                        <p class="help-block">Weitere Möglichkeiten ...</p>
                    </div>
                </div>
            </form>
        </div>

        <div class="container">
            <a name="3"></a>
            <h1>Nutzung im crowdmodul</h1>
            
            <ul>
                <li><b>realtime notification</b></li>
                <li><b>shoutbox</b></li>
                <li><b>chatsystem</b></li>
            </ul>
        </div>
        
        <div class="container">
            <a name="4"></a>
            <h1>Integration</h1>
             <ul>
                <li>session des crowdmoduls nutzen</li>
                <li>session gegen db session abgleichen</li>
                <li>client-side trigger VS serverseitige trigger...</li>
            </ul>
        </div>
        
        <script>
            $(document).ready(function() {
                var jobstatus = new client_jobstatus( new client() );
                
                $('input[name="testit[1]"]').click(jobstatus.findUser);
                $('input[name="testit[2]"]').click(jobstatus.broadcastMessage);
                //$('#input02').keyup(jobstatus.findUser);
                $('#input03').focus(jobstatus.findActiveUser);

            });
        </script>
        
        <script src="http://localhost:8111/socket.io/socket.io.js"></script>
        <script src="client.js"></script>
        <script src="client_jobstatus.js"></script>
    </body>
</html>