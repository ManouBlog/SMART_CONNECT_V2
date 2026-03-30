@component('mail::message')

<h1>Bienvenue</h1>

<span>
Soyez la bienvenue Mr(Mme) {{$data['email']}} <br> Nous vous enverons dans votre boite mail, des offres d'emploi
.
Pour pourvoir postuler à une offre veuillez-vous inscrire en cliquant sur le lien ci-dessous:  </span>
@component('mail::button', ['url' => $url])
Merci<br>
{{ config('app.name') }}
@endcomponent
