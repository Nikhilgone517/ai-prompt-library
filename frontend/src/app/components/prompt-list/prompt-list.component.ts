import { Component, OnInit } from '@angular/core';
import { PromptService } from '../../services/prompt.service';

@Component({
  selector: 'app-prompt-list',
  templateUrl: './prompt-list.component.html'
})
export class PromptListComponent implements OnInit {
  prompts: any[] = [];

  constructor(private promptService: PromptService) { }

  ngOnInit(): void {
    this.promptService.getPrompts().subscribe(data => {
      this.prompts = data;
    });
  }
}