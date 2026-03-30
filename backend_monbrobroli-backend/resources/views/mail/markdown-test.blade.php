@component('mail::message')
<h2 class="text-danger">Nouvelle offre disponible</h2>
<h2>Salut</h2>
<h3>L'offre {{$data1['nom_offre']}} vient d'être ajouté.</h3>
<h3>Du {{$data1['debut']}}  au {{$data1['fin']}}</h3>
<span>Lieu : {{$data1['lieu']}}</span>
<br>
<span>Pour plus de détails, Veuillez cliqué sur le bouton ci-dessous</span>

@component('mail::button', ['url' => $url])
Voir toutes les offres disponibles.
@endcomponent

Merci<br>
{{ config('app.name') }}
@endcomponent
