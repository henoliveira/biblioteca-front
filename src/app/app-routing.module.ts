import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociadoComponent } from './components/associado/associado.component';
import { ExemplarComponent } from './components/exemplar/exemplar.component';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { LoginComponent } from './components/login/login.component';
import { PublicacaoComponent } from './components/publicacao/publicacao.component';
import { LoginActivate } from './middlewares/login.middleware';
import { ReservaComponent } from './components/reserva/reserva.component';
import { EmprestimoComponent } from './components/emprestimo/emprestimo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'funcionario',
    component: FuncionarioComponent,
    title: 'Funcionário',
    canActivate: [LoginActivate],
  },
  {
    path: 'associado',
    component: AssociadoComponent,
    title: 'Associados',
    canActivate: [LoginActivate],
  },
  {
    path: 'publicacao',
    component: PublicacaoComponent,
    title: 'Publicação',
    canActivate: [LoginActivate],
  },
  {
    path: 'exemplar',
    component: ExemplarComponent,
    title: 'Exemplares',
    canActivate: [LoginActivate],
  },
  {
    path: 'reserva',
    component: ReservaComponent,
    title: 'Reserva',
    canActivate: [LoginActivate],
  },
  {
    path: 'emprestimo',
    component: EmprestimoComponent,
    title: 'Emprestimo',
    canActivate: [LoginActivate],
  },
  {
    path: '**',
    redirectTo: 'funcionario',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [LoginActivate],
  exports: [RouterModule],
})
export class AppRoutingModule {}
