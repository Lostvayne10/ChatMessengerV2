<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Conversation;

class ConversationController extends Controller
{

    

    public function index(Request $request)
    {
        $user_id = $request->user_id;
        return Conversation::where('user_id', $user_id)
                ->get([
                    'id',
                    'contact_id',
                    'last_message',
                    'last_time',
                    'listen_notificacions',
                    'has_blocked'
                ]);
    }
}


