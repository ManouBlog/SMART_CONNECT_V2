<?php

namespace App\Services;

use DeepL\Translator;

class DeepLService
{
    protected $translator;

    public function __construct()
    {
        // Initialiser le SDK DeepL avec la clé API
        $apiKey = env('DEEPL_API_KEY');
        $this->translator = new Translator($apiKey);
    }

    public function translateText($text, $targetLanguage = 'en')
    {
        try {
            // Utilise le SDK pour traduire le texte
            $result = $this->translator->translateText($text, strtoupper('fr'), strtoupper($targetLanguage));
            return $result->text; // Retourne le texte traduit
        } catch (\Exception $e) {
            // Gère les erreurs (par exemple, si la traduction échoue)
            return $text;
        }
    }
}
