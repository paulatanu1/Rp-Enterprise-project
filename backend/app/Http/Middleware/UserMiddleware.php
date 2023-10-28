<?php

namespace App\Http\Middleware;

use Closure;

class UserMiddleware
{
    public function handle($request, Closure $next)
    {
        // Check if the user is an admin
        // if( Auth::check() && Auth::user()->role == 1){
        if (auth()->user() && auth()->user()->role == 0) {
            return $next($request);
        }

        // If not an admin, you can return a response or redirect as needed.
        return response('Unauthorized', 403);
    }
}
