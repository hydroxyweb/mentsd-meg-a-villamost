<?php
$DB = include ('config.php');

$mysqli = new mysqli('127.0.0.1',$DB['db_username'],$DB['db_password'],$DB['db_name']);

// Check connection
if ($mysqli -> connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
}

if (isset($_POST['save'])) {
    $name = strip_tags($_POST['name']);
    $score = (int) strip_tags($_POST['score']);

    if (empty($name) || $score > 32000) {
        return;
    }

    $sql = "INSERT INTO highscore ".
        "(name,score) "."VALUES ".
        "('$name','$score')";

    $mysqli->query($sql);
} else if (isset($_POST['get'])) {
    echo '<tr>
            <th class="cell">Helyezés</th>
            <th class="cell">Játékos neve</th>
            <th class="cell">Pontszám</th>
        </tr>';
    $sql = 'SELECT name,score FROM highscore ORDER BY score DESC,inserted DESC LIMIT 10';
    $result = $mysqli->query($sql);
    $position = 1;
    while($row = $result->fetch_assoc()) {
        echo '<tr><td class="cell">'.$position.'.</td><td class="cell">'.$row['name'].'</td><td class="cell">'.$row['score'].'</td></tr>';
        $position++;
    }
}

