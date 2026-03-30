<x-mail::message>
# Nouveau message de contact

**De:** {{ $data['nom'] }} {{ $data['prenoms'] }}  
**Email:** {{ $data['email'] }}  
**Téléphone:** {{ $data['phone'] ?? 'Non renseigné' }}  
**Entreprise:** {{ $data['company'] ?? 'Non renseignée' }}  

**Objet:** {{ $data['objet'] }}

**Message:**  
{{ $data['message'] }}

---  
*Envoyé le {{ $data['submitted_at'] }}*
</x-mail::message>