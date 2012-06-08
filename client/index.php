<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>websocket crowdguru test</title>
        <link rel="stylesheet" type="text/css" href="jquery.noty.css"/>
        <link rel="stylesheet" type="text/css" href="noty_theme_default.css"/>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
        <script src="jquery.noty.js"></script>

        <script>
            $(document).ready(function() {
                var jobstatus = new client_jobstatus( new client() );
                jobstatus.changed({'meinjob' : 18});
            });
        </script>
    </head>
    <body>
        <script src="http://localhost:8111/socket.io/socket.io.js"></script>
        <script src="client.js"></script>
        <script src="client_jobstatus.js"></script>
    </body>
</html>
