<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .job{
            text-align: center;
        }
    </style>
</head>

<body>
    <span class="job">Vous avez été choisir pour un job</span>
    <div>
        <h1>Mr(Mme) {{$data1['nom']}} vous avez été séléctionner par  <br>
         {{$data['nom']}} pour effectuer un travail sur une période.</h1>
        <p>Merci</p>
    </div>
</body>

</html>