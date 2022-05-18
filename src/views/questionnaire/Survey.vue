// Create and setup your form here
 
<template>
  <div>
    <header class="vff-header">
      <div class="f-container">
        <!-- Add custom logo here -->
        <svg class="f-logo" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet"
          viewBox="0 0 35.606 11.211">
          <path d="M.134.837H3.21V8.01h4.203v2.18H.134V.837z" />
          <path
            d="M11.875.59c1.48 0 2.668.448 3.567 1.344s1.35 2.052 1.35 3.47c0 1.48-.445 2.7-1.336 3.632S13.38 10.45 11.9 10.45c-1.678 0-2.954-.54-3.827-1.622-.717-.9-1.08-2.022-1.09-3.397-.01-1.36.39-2.484 1.193-3.374C9.06 1.08 10.292.59 11.875.59zm0 2.283c-.563 0-1.003.222-1.323.662-.338.467-.507 1.124-.507 1.972 0 .865.162 1.524.487 1.978a1.58 1.58 0 0 0 1.369.682c.588 0 1.04-.223 1.355-.668s.474-1.07.474-1.875c0-1.834-.62-2.75-1.855-2.75z" />
          <path
            d="M21.565 7.078V5.055h4.217v5.163h-1.986l-.13-.908c-.693.76-1.617 1.142-2.777 1.142-1.383 0-2.488-.437-3.313-1.3s-1.243-2.03-1.252-3.464c-.01-1.462.385-2.65 1.18-3.567.875-1.012 2.11-1.518 3.7-1.518 1.21 0 2.207.303 3 .907s1.264 1.457 1.447 2.556h-2.92c-.207-.787-.73-1.182-1.57-1.182-.553 0-.988.236-1.303.707s-.475 1.153-.475 2.043c0 1.695.652 2.542 1.96 2.542.363 0 .695-.103.998-.306a1.29 1.29 0 0 0 .572-.784h-1.35v.002z" />
          <path
            d="M30.556.59c1.48 0 2.668.448 3.568 1.344s1.348 2.052 1.348 3.47c0 1.48-.443 2.7-1.336 3.632S32.06 10.45 30.58 10.45c-1.678 0-2.953-.54-3.826-1.622-.72-.892-1.082-2.022-1.1-3.398-.008-1.357.39-2.48 1.193-3.372C27.74 1.08 28.974.59 30.556.59zm0 2.283c-.563 0-1.002.222-1.322.662-.336.467-.506 1.125-.506 1.972 0 .865.162 1.524.486 1.978s.78.682 1.37.682 1.04-.223 1.355-.668.475-1.07.475-1.875c-.002-1.834-.62-2.75-1.857-2.75z" />
        </svg>
      </div>
    </header>

    <flow-form ref="flowform" v-on:complete="onComplete" v-on:submit="onSubmit" v-bind:questions="questions"
      v-bind:language="language" v-bind:standalone="true">
      <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
      <!-- We've overriden the default "complete" slot content -->
      <template v-slot:complete>
        <div class="f-section-wrap">
          <p>
            <span class="fh2">Agradecemos. 🙏</span>
            <span class="f-section-text">
              Que legal, agora conhecemos melhor suas dores e expectativas, entraremos em contato para conversarmos melhor.
            </span>
          </p>
          <p class="f-description"><b>OBS:</b> Você precisa clicar em <b>confirmar</b> para validar seu formulário.</p>
        </div>
      </template>

      <!-- We've overriden the default "completeButton" slot content -->
      <template v-slot:completeButton>
        <div class="f-submit" v-if="!submitted">
          <button class="o-btn-action" ref="button" type="submit" href="#" v-on:click.prevent="onSendData()"
            aria-label="Press to submit">
            <span>{{ language.submitText }}</span>
          </button>
          <a class="f-enter-desc" href="#" v-on:click.prevent="onSendData()"
            v-html="language.formatString(language.pressEnter)">
          </a>
        </div>

        <p class="text-success" v-if="submitted">Formulário enviado.</p>
      </template>
    </flow-form>
  </div>
</template>

<script>
/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://www.ditdot.hr/en
*/

// Import necessary components and classes
import FlowForm from '../../components/FlowForm.vue'
import QuestionModel, { QuestionType, ChoiceOption, LinkOption } from '../../models/QuestionModel'
import LanguageModel from '../../models/LanguageModel'
// If using the npm package, use the following line instead of the ones above.
// import FlowForm, { QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'

export default {
  name: 'example',

  components: {
    FlowForm
  },

  data() {
    return {
      submitted: false,
      completed: false,
      language: new LanguageModel(),
      // Create question list with QuestionModel instances
      questions: [
        new QuestionModel({
          id: 'first_name',
          tagline: 'Olá, Seja bem-vindo ao nosso questionário 😊',
          title: 'Seu nome completo:',
          type: QuestionType.Text,
          required: true,
          placeholder: 'Digite aqui...'
        }),
        new QuestionModel({
          id: 'email',
          tagline: "Prazer te conhecer 👀, vamos continuar",
          title: 'Seu email:',
          type: QuestionType.Email,
          required: true,
          placeholder: 'Digite aqui...'
        }),
        new QuestionModel({
          id: 'phone',
          tagline: 'Ótimo! Nos deixe um telefone pra entrar em contato com você',
          title: 'Telefone:',
          type: QuestionType.Phone,
          required: true,
          mask: '(##) #####-####'
        }),
        new QuestionModel({
          id: 'company',
          // tagline: '',
          title: 'Nome da sua Empresa/Startup:',
          type: QuestionType.Text,
          required: true,
          placeholder: 'Digite aqui...'
        }),

        new QuestionModel({
          id: 'quantity-of-employees',
          //tagline: 'Where would you like to go? 🤔',
          title: 'Quantos funcionários sua empresa possui?',
          type: QuestionType.Dropdown,
          multiple: false,
          placeholder: 'Selecione',
          inline: false,
          required: true,
          options: [
            new ChoiceOption({
              label: '1-5'
            }),
            new ChoiceOption({
              label: '6-10',
            }),
            new ChoiceOption({
              label: '11-50',
            }),
            new ChoiceOption({
              label: '55-acima',
            })
          ],
          // jump: {
          //   path_b: 'path_b'
          // }
        }),

        new QuestionModel({
          id: 'field',
          title: 'Qual o seu ramo de atuação?',
          type: QuestionType.Dropdown,
          multiple: false,
          placeholder: 'Selecione',
          inline: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Serviços'
            }),
            new ChoiceOption({
              label: 'Produtos',
            }),

          ],
        }),
        new QuestionModel({
          id: 'explanation',
          title: 'Queremos conhecer expectativas e dores que você possui',
          content: 'As próximas perguntas vão nos mostrar como funcionam seus processos e como a podemos atuar para melhorar as experiências envolvidas.',
          //description: 'Note: We will take a look at our multiple path feature next.',
          type: QuestionType.SectionBreak
        }),
        new QuestionModel({
          id: 'prazos',
          tagline: 'PRAZOS DE ENTREGA.',
          title: 'Qual o seu nivel de satisfação?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Totalmente insatisfeito',
            }),
            new ChoiceOption({
              label: 'Pouco insatisfeito',
            }),
            new ChoiceOption({
              label: 'Neutro'
            }),
            new ChoiceOption({
              label: 'Pouco satisfeito'
            }),
            new ChoiceOption({
              label: 'Totalmente satisfeito'
            })
          ]
        }),

        new QuestionModel({
          id: 'comunicacao',
          tagline: 'COMUNICAÇÃO INTERNA.',
          title: 'Qual o seu nivel de satisfação?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Totalmente insatisfeito',
            }),
            new ChoiceOption({
              label: 'Pouco insatisfeito',
            }),
            new ChoiceOption({
              label: 'Neutro'
            }),
            new ChoiceOption({
              label: 'Pouco satisfeito'
            }),
            new ChoiceOption({
              label: 'Totalmente satisfeito'
            })
          ]
        }),

        new QuestionModel({
          id: 'gestao-equipe',
          tagline: 'GESTÃO DA EQUIPE.',
          title: 'Qual o seu nivel de satisfação?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Totalmente insatisfeito',
            }),
            new ChoiceOption({
              label: 'Pouco insatisfeito',
            }),
            new ChoiceOption({
              label: 'Neutro'
            }),
            new ChoiceOption({
              label: 'Pouco satisfeito'
            }),
            new ChoiceOption({
              label: 'Totalmente satisfeito'
            })
          ]
        }),

        new QuestionModel({
          id: 'usuario',
          tagline: 'INTERAÇÃO COM USUÁRIO.',
          title: 'Qual o seu nivel de satisfação?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Totalmente insatisfeito',
            }),
            new ChoiceOption({
              label: 'Pouco insatisfeito',
            }),
            new ChoiceOption({
              label: 'Neutro'
            }),
            new ChoiceOption({
              label: 'Pouco satisfeito'
            }),
            new ChoiceOption({
              label: 'Totalmente satisfeito'
            })
          ]
        }),

        new QuestionModel({
          id: 'novos-usuario',
          tagline: 'INTERAÇÃO COM NOVO USUÁRIO.',
          title: 'Qual o seu nivel de satisfação?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Totalmente insatisfeito',
            }),
            new ChoiceOption({
              label: 'Pouco insatisfeito',
            }),
            new ChoiceOption({
              label: 'Neutro'
            }),
            new ChoiceOption({
              label: 'Pouco satisfeito'
            }),
            new ChoiceOption({
              label: 'Totalmente satisfeito'
            })
          ]
        }),

        new QuestionModel({
          id: 'organizacao',
          tagline: 'ORGANIZAÇÃO GERAL.',
          title: 'Qual o seu nivel de satisfação?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Totalmente insatisfeito',
            }),
            new ChoiceOption({
              label: 'Pouco insatisfeito',
            }),
            new ChoiceOption({
              label: 'Neutro'
            }),
            new ChoiceOption({
              label: 'Pouco satisfeito'
            }),
            new ChoiceOption({
              label: 'Totalmente satisfeito'
            })
          ]
        }),

        new QuestionModel({
          id: 'gerenciador',
          tagline: 'GERENCIADORES DE PROCESSOS (Runrun it, Trello, etc).',
          title: 'Qual o seu nivel de satisfação?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Totalmente insatisfeito',
            }),
            new ChoiceOption({
              label: 'Pouco insatisfeito',
            }),
            new ChoiceOption({
              label: 'Neutro'
            }),
            new ChoiceOption({
              label: 'Pouco satisfeito'
            }),
            new ChoiceOption({
              label: 'Totalmente satisfeito'
            })
          ]
        }),

        new QuestionModel({
          id: 'demandas',
          tagline: 'CRIAÇÃO E APLICAÇÃO DE DEMANDAS.',
          title: 'Qual o seu nivel de satisfação?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Totalmente insatisfeito',
            }),
            new ChoiceOption({
              label: 'Pouco insatisfeito',
            }),
            new ChoiceOption({
              label: 'Neutro'
            }),
            new ChoiceOption({
              label: 'Pouco satisfeito'
            }),
            new ChoiceOption({
              label: 'Totalmente satisfeito'
            })
          ]
        }),
        
        new QuestionModel({
          id: 'equipe',
          tagline: 'GESTÃO FINANCEIRA.',
          title: 'Qual o seu nivel de satisfação?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Totalmente insatisfeito',
            }),
            new ChoiceOption({
              label: 'Pouco insatisfeito',
            }),
            new ChoiceOption({
              label: 'Neutro'
            }),
            new ChoiceOption({
              label: 'Pouco satisfeito'
            }),
            new ChoiceOption({
              label: 'Totalmente satisfeito'
            })
          ]
        }),

        new QuestionModel({
          id: 'acessibilidade',
          tagline: 'ACESSIBILIDADE.',
          title: 'Qual o seu nivel de satisfação?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Totalmente insatisfeito',
            }),
            new ChoiceOption({
              label: 'Pouco insatisfeito',
            }),
            new ChoiceOption({
              label: 'Neutro'
            }),
            new ChoiceOption({
              label: 'Pouco satisfeito'
            }),
            new ChoiceOption({
              label: 'Totalmente satisfeito'
            })
          ]
        }),

        new QuestionModel({
          id: 'conexao',
          tagline: 'CONEXÃO DO CLIENTE COM PRODUTO/SERVIÇO.',
          title: 'Qual o seu nivel de satisfação?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Totalmente insatisfeito',
            }),
            new ChoiceOption({
              label: 'Pouco insatisfeito',
            }),
            new ChoiceOption({
              label: 'Neutro'
            }),
            new ChoiceOption({
              label: 'Pouco satisfeito'
            }),
            new ChoiceOption({
              label: 'Totalmente satisfeito'
            })
          ]
        }),

        new QuestionModel({
          id: 'conversao',
          tagline: 'CONVERSÃO DE ACESSOS EM VENDAS.',
          title: 'Qual o seu nivel de satisfação?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Totalmente insatisfeito',
            }),
            new ChoiceOption({
              label: 'Pouco insatisfeito',
            }),
            new ChoiceOption({
              label: 'Neutro'
            }),
            new ChoiceOption({
              label: 'Pouco satisfeito'
            }),
            new ChoiceOption({
              label: 'Totalmente satisfeito'
            })
          ]
        }),
         new QuestionModel({
          id: 'dores',
          tagline: 'SUAS DORES',
          title: 'O que mais te incomoda hoje?',
          helpTextShow: true,
          type: QuestionType.MultipleChoice,
          multiple: true,
          allowOther: true,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Atraso nos prazos',
            }),
            new ChoiceOption({
              label: 'Falha de comunicação interna',
            }),
            new ChoiceOption({
              label: 'Gestão da equipe'
            }),
            new ChoiceOption({
              label: 'Interação com usuário'
            }),
            new ChoiceOption({
              label: 'Desorganização interna'
            }),
            new ChoiceOption({
              label: 'Processos cansativos'
            }),
            new ChoiceOption({
              label: 'Gestão financeira defeituosa'
            }),
            new ChoiceOption({
              label: 'Protocolos de demanda mal definidos'
            }),
            new ChoiceOption({
              label: 'Acessibilidade falha ou nula'
            }),
            new ChoiceOption({
              label: 'Não sei o que meu cliente acha do meu produto'
            }),
            new ChoiceOption({
              label: 'Dificuldade em converter acessos em vendas'
            })
          ]
        }),

        // new QuestionModel({
        //   id: 'movies',
        //   title: 'List your favorite movies. 🍿',
        //   type: QuestionType.LongText,
        //   required: true,
        //   placeholder: 'Start typing here...'
        // }),
        // new QuestionModel({
        //   id: 'multiple_choice',
        //   tagline: 'FYI, You can always go back 👈, use the up arrow on the bottom.',
        //   title: 'Multiple choice question:',
        //   helpTextShow: false,
        //   type: QuestionType.MultipleChoice,
        //   multiple: false,
        //   allowOther: true,
        //   required: true,
        //   options: [
        //     new ChoiceOption({
        //       label: 'Answer 1'
        //     }),
        //     new ChoiceOption({
        //       label: 'Answer 2'
        //     }),
        //     new ChoiceOption({
        //       label: 'Answer 3'
        //     })
        //   ]
        // }),
        // new QuestionModel({
        //   id: 'multiple_choices',
        //   title: 'Multiple choices question:',
        //   type: QuestionType.MultipleChoice,
        //   multiple: true,
        //   helpText: 'Select all that apply. 👇',
        //   required: true,
        //   options: [
        //     new ChoiceOption({
        //       label: 'Answer 1'
        //     }),
        //     new ChoiceOption({
        //       label: 'Answer 2'
        //     }),
        //     new ChoiceOption({
        //       label: 'Answer 3'
        //     }),
        //     new ChoiceOption({
        //       label: 'Answer 4'
        //     })
        //   ]
        // }),
        // new QuestionModel({
        //   id: 'break_1',
        //   title: 'Awesome, thank you. 🙏',
        //   content: 'You arrived at the section break of our little demo survey. To continue exploring, just press enter or use the continue button.',
        //   description: 'Note: We will take a look at our multiple path feature next.',
        //   type: QuestionType.SectionBreak
        // }),
        // new QuestionModel({
        //   id: 'choose_path',
        //   tagline: 'Where would you like to go? 🤔',
        //   title: 'Choose your path:',
        //   type: QuestionType.Dropdown,
        //   multiple: false,
        //   placeholder: 'Select',
        //   inline: true,
        //   required: true,
        //   options: [
        //     new ChoiceOption({
        //       label: 'Path A'
        //     }),
        //     new ChoiceOption({
        //       label: 'Path B',
        //       value: 'path_b'
        //     })
        //   ],
        //   jump: {
        //     path_b: 'path_b'
        //   }
        // }),
        // new QuestionModel({
        //   id: 'path_a',
        //   title: 'Excellent choice! 🥳',
        //   content: 'Press enter or use the continue button for the final submit screen.',
        //   type: QuestionType.SectionBreak,
        //   jump: {
        //     _other: '_submit'
        //   }
        // }),
        // new QuestionModel({
        //   id: 'path_b',
        //   tagline: 'Path B',
        //   title: 'Hmm, are you sure?',
        //   helpText: 'Path A sounds like a winner! 😉',
        //   type: QuestionType.MultipleChoice,
        //   multiple: false,
        //   required: true,
        //   options: [
        //     new ChoiceOption({
        //       label: 'Ok, let\'s go with A',
        //       value: 'path_a'
        //     }),
        //     new ChoiceOption({
        //       label: 'Yes, finish the survey'
        //     })
        //   ],
        //   jump: {
        //     path_a: 'path_a'
        //   }
        // })
      ]
    }
  },

  mounted() {
    document.addEventListener('keyup', this.onKeyListener)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.onKeyListener)
  },

  methods: {
    onKeyListener($event) {
      // We've overriden the default "complete" slot so
      // we need to implement the "keyup" listener manually.

      if ($event.key === 'Enter' && this.completed && !this.submitted) {
        this.onSendData()
      }
    },

    /* eslint-disable-next-line no-unused-vars */
    onComplete(completed, questionList) {
      // This method is called whenever the "completed" status is changed.
      this.completed = completed
    },

    /* eslint-disable-next-line no-unused-vars */
    onSubmit(questionList) {
      // This method will only be called if you don't override the
      // completeButton slot.
      this.onSendData()
    },

    onSendData() {
      // Set `submitted` to true so the form knows not to allow back/forward
      // navigation anymore.
      this.$refs.flowform.submitted = true

      this.submitted = true

      /* eslint-disable-next-line no-unused-vars */
      const data = this.getData()
      /*
        You can use Fetch API to send the data to your server, eg.:

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      */
    },

    getData() {
      const data = {
        questions: [],
        answers: []
      }

      this.questions.forEach(question => {
        if (question.title) {
          let answer = question.answer
          if (Array.isArray(answer)) {
            answer = answer.join(', ')
          }

          data.questions.push(question.title)
          data.answers.push(answer)
        }
      })

      return data
    }
  }
}
</script>

<style lang="css">
/* @import '../../assets/css/themes/theme-minimal.css'; */
@import '../../assets/css/themes/theme-minimal.css';
/* If using the npm package, use the following lines instead of the one above */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css'; */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css'; */
</style>