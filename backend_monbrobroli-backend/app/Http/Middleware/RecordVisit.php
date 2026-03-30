<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Visit;
use Illuminate\Http\Request;

class RecordVisit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
         Visit::create([
            'ip_address' => $request->ip(),
        ]);
        return $next($request);
    }
}
