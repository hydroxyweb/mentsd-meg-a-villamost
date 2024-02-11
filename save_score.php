<?php
$DB = include ('config.php');
$limit = 10;

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

    if (empty($name) || $score > 500000 || !in_array($mode, ['E', 'N', 'H'])) {
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
    $sqlWhereCond = '';
    if (!isset($_POST['halloffame'])) {
        $sqlWhereCond='WHERE inserted>="'.date('Y-m').'-01 00:00:00" AND inserted<="'.date('Y-m-t').' 23:59:59"';
    }
    $sql = 'SELECT name,score,mode FROM highscore '.$sqlWhereCond.' ORDER BY score DESC,inserted DESC LIMIT '.$limit;
    $result = $mysqli->query($sql);
    $position = 1;
    while($row = $result->fetch_assoc()) {
        echo '<tr><td class="cell">'.$position.'.</td><td class="cell">'.$row['name'].'</td><td class="cell">'.$gameModes[$row['mode']].'</td><td class="cell">'.$row['score'].'</td></tr>';
        $position++;
    }

    if ($position < $limit) {
        for($i = $position + 1; $i <= $limit; $i++) {
            echo '<tr><td class="cell">'.$i.'.</td><td class="cell">...</td><td class="cell">...</td><td class="cell">...</td></tr>';
        }
    }
}

