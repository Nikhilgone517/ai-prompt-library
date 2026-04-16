import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromptService } from '../../services/prompt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prompt',
  templateUrl: './add-prompt.component.html'
})
export class AddPromptComponent implements OnInit {
  promptForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private promptService: PromptService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Assignment requirements: Title min 3, Content min 20, Complexity 1-10
    this.promptForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      complexity: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  onSubmit(): void {
    if (this.promptForm.valid) {
      this.promptService.createPrompt(this.promptForm.value).subscribe(() => {
        this.router.navigate(['/prompts']);
      });
    }
  }
}