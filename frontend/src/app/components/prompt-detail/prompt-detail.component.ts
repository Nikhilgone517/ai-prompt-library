import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromptService } from '../../services/prompt.service';

@Component({
  selector: 'app-prompt-detail',
  templateUrl: './prompt-detail.component.html'
})
export class PromptDetailComponent implements OnInit {
  prompt: any = null;

  constructor(
    private route: ActivatedRoute,
    private promptService: PromptService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.promptService.getPrompt(id).subscribe(data => {
        this.prompt = data;
      });
    }
  }
}