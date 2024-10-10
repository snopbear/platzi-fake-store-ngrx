import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { emptyAction, showAlert } from './app.actions';
import { ToastrService } from 'ngx-toastr';
import { ResultType } from './result-type.enum';

@Injectable()
export class AppEffects {
  private $action = inject(Actions);
  private toaster = inject(ToastrService); // Inject ToastrService

  _showAlert = createEffect(() =>
    this.$action.pipe(
      ofType(showAlert),
      exhaustMap((action) => {
        if (action.resultType == ResultType.FAIL) {
          this.toaster.error(action.message, action.resultType);
        } else {
          this.toaster.success(action.message, action.resultType);
        }

        return [emptyAction()];
      })
    )
  );

}
