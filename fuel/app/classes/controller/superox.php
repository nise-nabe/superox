<?php

class Controller_Superox extends Controller
{
	public function action_index()
	{
		$data['stage'] = View::forge('superox/stage');

		return Response::forge(View::forge('superox/index', $data));
	}
}
