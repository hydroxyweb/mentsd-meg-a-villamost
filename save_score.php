<?php
$DB = include ('config.php');

$mysqli = new mysqli('127.0.0.1',$DB['db_username'],$DB['db_password'],$DB['db_name']);

// Check connection
if ($mysqli -> connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
}

$gameModes = [
    'E' => 'Könnyű',
    'N' => 'Normál',
    'H' => 'Nehéz',
];

if (isset($_POST['save'])) {
    $name = strip_tags($_POST['name']);
    $score = (int) strip_tags($_POST['score']);
    $mode = strtoupper(substr($_POST['mode'], 0, 1));

    if (empty($name) || $score > 32000 || !in_array($mode, ['E', 'N', 'H'])) {
        return;
    }

    $sql = "INSERT INTO highscore ".
        "(name,score,mode) "."VALUES ".
        "('$name','$score','$mode')";

    $mysqli->query($sql);
} else if (isset($_POST['get'])) {
    echo '<tr>
            <th class="cell">Helyezés</th>
            <th class="cell">Játékos neve</th>
            <th class="cell">Nehézség</th>
            <th class="cell">Pontszám</th>
        </tr>';
    $sql = 'SELECT name,score,mode FROM highscore ORDER BY score DESC,inserted DESC LIMIT 10';
    $result = $mysqli->query($sql);
    $position = 1;
    while($row = $result->fetch_assoc()) {
        echo '<tr><td class="cell">'.$position.'.</td><td class="cell">'.$row['name'].'</td><td class="cell">'.$gameModes[$row['mode']].'</td><td class="cell">'.$row['score'].'</td></tr>';
        $position++;
    }
}

