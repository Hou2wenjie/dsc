import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Section } from 'app/home/components/section/section.component';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account;
  authSubscription: Subscription;
  modalRef: NgbModalRef;

  sections: Section[] = [
    {
      title: 'The Origin of Our Program',
      content: [
        'The highly developed industrial Country Germany is gradually going under ' +
          'the pressure of ageing citizens and lower birth rate than before under its ' +
          'prosperity. On the one hand, many senior citizens needs to getting comprehensive ' +
          'and high-quality care in the nursing home, therefore more and more positions in this ' +
          'area are being offered but not occupied. On the other hand, many enthusiast and caring ' +
          'nursing major Chinese students are willing to join a nursing profession in Germany and ' +
          'improve their life situation. Thus in 2020, our team started to work on this and the ' +
          'Sino-German Nursing Program was launched, in partnership with the order of Changsha ' +
          'International Education Exchange Service Center.',
        'The Sino-German program is preparing youth from China to pursue a paid apprenticeship ' + 'as recognised nurses in Germany.',
        'According to the Head of the Federal Employment Agency of Germany there are more than 53k ' +
          'unoccupied apprenticeship in Germany and the share of nursing and caring area takes a great ' +
          'part of this, with more and more citizens born in the baby boom era going into retire the ' +
          'vacant place for career in Nursing and Caring are waiting for the young Chinese students with ' +
          'love and patient.',
        'In oder to connect the needs and supply of both side and fasten the relationship of peoples we ' +
          'decided to chose the name of Sino-German Nursing Program which represent the name of both ' +
          'civilisation.'
      ],
      id: null,
      class: 'wrapper spotlight style1'
    },
    {
      title: '2. Overview of the Program(in China)',
      content: [
        'The candidates with interests to join the program need to apply and would be ' +
          'informed to join a web interview with us. If the candidates could complete this two steps ' +
          'they would be admitted to the fist phase of our 4 years program which is the language ' +
          'learning phases in China.',
        'In this phases we would personalised a study plan for each attendees with different backgrounds ' +
          '(either just starts the nursing Major in Chinese educational institutions or students who major ' +
          'in Germanistik and want to change subjects etc.). After that we would support the registration of ' +
          'German language course in their city or the attendees could come to Changsha and join the German ' +
          'course provided from the Changsha International Education Exchange Service Center. \n' +
          'After 8 Month of intensive learning of German, attendees who reach the language Level of ' +
          'B2 under CEFR would join us for a one month seminar which teach some fundamental knowledge ' +
          'in Nursing in Changsha.'
      ],
      id: 'two',
      class: 'wrapper alt spotlight style2'
    },
    {
      title: '3. Overview of the Program (in Germany)',
      content: [
        'Once they’ve successfully completed the language and fundamental courses in China, ' +
          'the qualified participants would start their journey of apprenticeship in Germany for 3 years.' +
          ' The apprenticeship which is called “Ausbildung” in Germany gives the participant to study ' +
          'for a profession in the classroom and in the meantime working in an institution. The tuition ' +
          'of this apprenticeship is fully sponsored  by the institution of intake if the participant ' +
          'could pass the interview with them. After successfully finish the apprenticeship in Germany ' +
          'the participants are qualified for a nursing job in Germany and the participants wil have the' +
          ' opportunity to return home or remain in Germany.'
      ],
      id: 'three',
      class: 'wrapper spotlight style3'
    },
    {
      title: '4. Advantages of the Program',
      content: [
        'this program could solve the problem of shortage of occupation in caregiving ' +
          'in German and improve the live situation of Chinese nursing major student, besides students ' +
          'could get fully sponsored tuition of apprenticeship in Germany from our partner in Germany.' +
          'After the entire processe the participants will get Qualification for working in Germany and ' +
          'China, which gives the participants fully chose and alternative,' +
          'and last but not least, going aboard could board their horizon and make them see ' +
          'the world differently'
      ],
      id: 'four',
      class: 'wrapper alt spotlight style4'
    },
    {
      title: '5. Apply here',
      content: [
        'In order to participate you are supposed to be a resident in China with valid ID and a Passport, besides that, a transcript of a healthy statment from a 3A hospital is needed in English. Are you ready for this journey? click here to start the application!'
      ],
      link: 'Apply here',
      id: 'five',
      class: 'wrapper style5'
    },
    {
      title: '6. Our Partner',
      content: [
        'the Sino-German Nursing Program develope team: 4 students major in computer science in the TUM',
        'the Changsha International Education Exchange Service Center: Support agency in the part of China',
        'Red Cross Society of China：Accredit for apprenticeship in Germany to be valid in China'
      ],
      link: 'Learn more',
      class: 'wrapper spotlight style4'
    }
  ];

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit() {
    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }

  registerAuthenticationSuccess() {
    this.authSubscription = this.eventManager.subscribe('authenticationSuccess', () => {
      this.accountService.identity().subscribe(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.eventManager.destroy(this.authSubscription);
    }
  }
}
