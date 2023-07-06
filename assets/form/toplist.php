<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Toplista</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial;
            -webkit-user-select: none; /* Safari */
            -ms-user-select: none; /* IE 10 and IE 11 */
            user-select: none; /* Standard syntax */
            color: #b07030;
        }

        .cell {
            text-align: center;
            padding: 10px;
            border-bottom: 1px dashed #a5671c;
            background: #ffcc99;
        }
    </style>
</head>
<body>
<table style="width: 350px;border: 1px solid #a5671c;border-collapse: collapse;border-spacing:0" id="toplistContainer" cellspacing="0" cellpadding="0">
    <tr>
        <th class="cell">Helyezés</th>
        <th class="cell">Játékos neve</th>
        <th class="cell">Nehézség</th>
        <th class="cell">Pontszám</th>
    </tr>

<?php

$gameModes = [
    'E' => 'Könnyű',
    'N' => 'Normál',
    'H' => 'Nehéz',
];

$DB = include ('../../config.php');
$mysqli = new mysqli('127.0.0.1',$DB['db_username'],$DB['db_password'],$DB['db_name']);

// Check connection
if ($mysqli -> connect_errno) {
echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
exit();
}
$sql = 'SELECT name,score,mode FROM highscore ORDER BY score DESC,inserted DESC LIMIT 10';
$result = $mysqli->query($sql);
$position = 1;
while($row = $result->fetch_assoc()) {
    echo '<tr><td class="cell">'.$position.'.</td><td class="cell">'.$row['name'].'</td><td class="cell">'.$gameModes[$row['mode']].'</td><td class="cell">'.$row['score'].'</td></tr>';
    $position++;
}

// Free result set
$result -> free_result();

$mysqli -> close();
?>
</table>
</body>
</html>
