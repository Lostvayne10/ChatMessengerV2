<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Juan Hernandez',
            'email' => 'i@hotmail.com',
            'password' => bcrypt('123'),
        ]);

        User::create([
            'name' => 'Jose Lopez',
            'email' => '123@hotmail.com',
            'password' => bcrypt('123'),
        ]);

        User::create([
            'name' => 'Masiosare Dominguez',
            'email' => 'md123@hotmail.com',
            'password' => bcrypt('123'),
        ]);
    }
}
