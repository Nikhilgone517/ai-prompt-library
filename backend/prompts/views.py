# from django.shortcuts import render

# # Create your views here.
import json
import redis
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Prompt

r = redis.Redis(host='redis', port=6379, db=0, decode_responses=True)

@csrf_exempt
def prompt_list_create(request):
    if request.method == 'GET':
        prompts = list(Prompt.objects.values('id', 'title', 'content', 'complexity', 'created_at'))
        return JsonResponse(prompts, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            title = data.get('title', '').strip()
            content = data.get('content', '').strip()
            complexity = data.get('complexity')

            if len(title) < 3:
                return JsonResponse({'error': 'Title must be at least 3 characters.'}, status=400)
            if not isinstance(complexity, int) or not (1 <= complexity <= 10):
                return JsonResponse({'error': 'Complexity must be an integer between 1 and 10.'}, status=400)

            prompt = Prompt.objects.create(title=title, content=content, complexity=complexity)
            
            return JsonResponse({
                'id': prompt.id,
                'title': prompt.title,
                'content': prompt.content,
                'complexity': prompt.complexity,
                'created_at': prompt.created_at
            }, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
            
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def prompt_detail(request, pk):
    if request.method == 'GET':
        prompt = get_object_or_404(Prompt, pk=pk)

        redis_key = f"prompt:{prompt.id}:views"
        view_count = r.incr(redis_key)

        return JsonResponse({
            'id': prompt.id, 
            'title': prompt.title,
            'content': prompt.content,
            'complexity': prompt.complexity,
            'created_at': prompt.created_at,
            'view_count': view_count
        })
        
    return JsonResponse({'error': 'Method not allowed'}, status=405)