import { NgModule } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AssociadoComponent } from './components/associado/associado.component';
import { PublicacaoComponent } from './components/publicacao/publicacao.component';
import { ExemplarComponent } from './components/exemplar/exemplar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReservaComponent } from './components/reserva/reserva.component';
import { EmprestimoComponent } from './components/emprestimo/emprestimo.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ConsultarPublicacaoComponent } from './components/consultar-publicacao/consultar-publicacao.component';
import { ConsultarEmprestimoComponent } from './components/consultar-emprestimo/consultar-emprestimo.component';
import { DevolucaoComponent } from './devolucao/devolucao.component';

@NgModule({
  declarations: [
    AppComponent,
    FuncionarioComponent,
    HeaderComponent,
    LoginComponent,
    AssociadoComponent,
    PublicacaoComponent,
    ExemplarComponent,
    ReservaComponent,
    EmprestimoComponent,
    LoadingComponent,
    ConsultarPublicacaoComponent,
    ConsultarEmprestimoComponent,
    DevolucaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
