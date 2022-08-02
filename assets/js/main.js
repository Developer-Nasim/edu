(function($) {
  "use strict";

  // calender
  if(document.querySelector('#datepicker')){ 
    $( "#datepicker" ).datepicker({ firstDay: 1});
  }


 // Show Notifications
 $('.showNotifs').click( function (){ 
    $('.dashRight-wrps').toggleClass('show');   
  }); 


  // Top Search suggest tags
  AutoSuggestionSearch()
  function AutoSuggestionSearch() {
        
        let allInputs = document.querySelectorAll("input[name=tags]");
        allInputs.forEach(Inp => {
            new Tagify(Inp, {
                whitelist: [    
                    "Joeke Hog",
                    "Joep Lima",
                    "Joep Siquior",
                    "ACL2", 
                    "ACT-III",
                    "Action!", 
                    "Ada", 
                ],
                blacklist: ["fuck", "shit"]
            });
        }) 

      let searchBtn = document.querySelectorAll('.searchIconItIs')

      if (searchBtn.length > 0) {
          searchBtn.forEach(btn => {
              btn.addEventListener('click', (e) => {
                  let searchBlk = e.target.parentElement.querySelector('.mainSearchBox');
                  searchBlk.classList.toggle('show')
                  
              })
          });
      }

  }

  // show success popup
  SuccessPopup()
  function SuccessPopup() {
    if ($('.showSuccess').length > 0) {
      $('.showSuccess').click((e) => {
        const targetModalBody = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        targetModalBody.classList.add('showSuccess') 
      })
    }
  }

    // Capacity 
    CapacityChange()
    function CapacityChange() {
        if (document.querySelector('.capacityLabel')) { 
            let Cpct = document.querySelector('.capacityLabel')
            let select = Cpct.querySelector('select')
            let Img = Cpct.querySelector('img')
            select.addEventListener('change', (e) => {
                Img.src = e.target.value;
            })
        }
    }   
 
  // Edit mode setup 
  if ($('.goToEdit').length > 0) {
    let EBTN = $('.goToEdit');
    EBTN.click((e) => {
        $('body').toggleClass('editmode')
        if ($('.lktAFrm').length > 0) {
            $('.lktAFrm').toggleClass('notEditing')
        }
        if ($('.IntoTime').length > 0) {
            if ($('.IntoTime').attr('type') == "text") {
                $('.IntoTime').attr('type', 'time')
            }else{
                $('.IntoTime').attr('type', 'text')
            } 
        }
    })
  }

  // StepForm 
  let closeNow = document.querySelectorAll('.ResetPopup');
  if (closeNow) { 
      closeNow.forEach(btn => {
          btn.addEventListener('click', () => {
              ResetStepPopupAll()
          })
      })
  }
  function ResetStepPopupAll() {
      let MainSteps = document.querySelector('.formSteps')
      let AllDOts = document.querySelector('.stepDots') 
      function StepReset() { 
          if (MainSteps) { 
              if (MainSteps.classList.contains('firstStep')) {
                  MainSteps.classList.remove('firstStep')
              }
              if (MainSteps.classList.contains('LastStep')) {
                  MainSteps.classList.remove('LastStep')
              }
              let allSteps = MainSteps.querySelectorAll('.step')
              allSteps.forEach(AlStep => {
                  AlStep.classList.remove('active')
              });
              allSteps[0].classList.add('active')
              if (document.querySelectorAll('.stepDots').length > 0) {
                let allDots = AllDOts.querySelectorAll('.dt')
                allDots.forEach(Dt => {
                    Dt.classList.remove('active')
                });
                allDots[0].classList.add('active') 
              }
          }
      }
      StepReset()
      function SuccessPopup() {
          let Modal = document.querySelector('.modal.showSuccess')
          if (Modal) {
            Modal.classList.remove('showSuccess')
          }
      }
      SuccessPopup()
  }
  function StepForm() { 
 
    let MainSteps = document.querySelector('.formSteps')
    let AllDOts = document.querySelector('.stepDots')
    let NextBtns = MainSteps.querySelectorAll('.nextStep') 
    if (MainSteps.querySelectorAll('.nextStep') && MainSteps.querySelectorAll('.nextStep').length > 0) { 
        NextBtns.forEach(NextBtn => { 
            NextBtn.addEventListener('click', (e) => { 
                function StepChange() { 
                    let AllSteps = MainSteps.querySelectorAll('.step');
                    let StepActive = MainSteps.querySelector('.step.active');

                    if (StepActive.nextElementSibling.classList.contains('endStep')) {
                        MainSteps.classList.add('LastStep')
                    }

                    if (StepActive.nextElementSibling.classList.contains('step')) {
                        StepActive.nextElementSibling.classList.add('active')
                        StepActive.classList.remove('active') 
                        MainSteps.classList.remove('firstStep')
                    }else{
                        AllSteps[0].classList.add('active')  
                        MainSteps.classList.add('firstStep')
                        MainSteps.classList.remove('LastStep')
                    }
                }
                StepChange()
                function DotChange() { 
                    if (document.querySelectorAll('.dt').length > 0) { 
                        let AllSDotss = AllDOts.querySelectorAll('.dt');
                        let DotActive = AllDOts.querySelector('.dt.active');
                        
                        if (DotActive.nextElementSibling && DotActive.nextElementSibling.classList.contains('dt')) {
                            DotActive.nextElementSibling.classList.add('active')
                            DotActive.classList.remove('active')
                        }else{
                            AllSDotss[0].classList.add('active')
                            DotActive.classList.remove('active')
                        }
                    }
                }
                DotChange()
            
            })
        })
    }
    if (MainSteps.querySelector('.prevNext') && MainSteps.querySelectorAll('.prevNext').length > 0) { 
        let PrevBtns = MainSteps.querySelectorAll('.prevNext')
        PrevBtns.forEach(PrevBtn => { 
            PrevBtn.addEventListener('click', (e) => {
                function StepChange() { 
                    let AllSteps = MainSteps.querySelectorAll('.step');
                    let StepActive = MainSteps.querySelector('.step.active'); 
                    if (StepActive.previousElementSibling.classList.contains('startStep')) {
                        MainSteps.classList.add('firstStep')
                        MainSteps.classList.remove('LastStep') 
                    } 
                    if (StepActive.previousElementSibling.classList.contains('step')) {
                        StepActive.previousElementSibling.classList.add('active')
                        StepActive.classList.remove('active')
                    }else{
                        AllSteps[0].classList.add('active') 
                    }
                }
                StepChange()
                function DotChange() { 
                    if (document.querySelectorAll('.dt').length > 0) { 
                        let AllSDotss = AllDOts.querySelectorAll('.dt');
                        let DotActive = AllDOts.querySelector('.dt.active');
                        
                        if (DotActive.previousElementSibling && DotActive.previousElementSibling.classList.contains('dt')) {
                            DotActive.previousElementSibling.classList.add('active')
                            DotActive.classList.remove('active')
                        }else{
                            AllSDotss[0].classList.add('active')
                            DotActive.classList.remove('active')
                        }
                    }
                }
                DotChange()
            
            })
        });
    }
 
  } 
  StepForm()


    //   Multi Func Modal
    let MultiFuncPopup = document.querySelectorAll('.withResetTheMultiFuncPopup')
    MultiFuncPopup.forEach(btn => {
        btn.addEventListener('click', () => {
            ResetMultiFuncMdl()
        })
    })
    function MultiFUncMdl() { 
        if (document.querySelectorAll('.connectStep2').length > 0) {
            let MainBlk = document.querySelector('.multiFuncStepHere')

            let StepOf2MainDiv = document.querySelector('.steps2') 
            let StepOf2Btns = document.querySelectorAll('.connectStep2')

            let StepOf3MainDiv = document.querySelector('.steps3') 
            let StepOf3Btns = document.querySelectorAll('.connectStep3')

            StepOf2Btns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (StepOf2MainDiv.querySelector('.step2.active')) { 
                        let activeStep = StepOf2MainDiv.querySelector('.step2.active'); 
                        activeStep.classList.remove('active')
                        activeStep.nextElementSibling.classList.add('active') 
                    }else{ 
                        if (StepOf2MainDiv.querySelectorAll('.step2').length > 0) {
                            let AllOfSteps = StepOf2MainDiv.querySelectorAll('.step2');
                            if (MainBlk.classList.contains('connected_steps_3')) {
                                MainBlk.classList.remove('connected_steps_3')
                                MainBlk.classList.add('connected_steps_2')
                                AllOfSteps[0].classList.add('active')  
                            }else{
                                MainBlk.classList.add('connected_steps_2')
                                AllOfSteps[0].classList.add('active')  
                            }
                        }
                    }
                    
                })
            });
            StepOf3Btns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (StepOf3MainDiv.querySelector('.step3.active')) { 
                        let activeStep = StepOf3MainDiv.querySelector('.step3.active'); 
                        activeStep.classList.remove('active')
                        activeStep.nextElementSibling.classList.add('active') 
                    }else{ 
                        if (StepOf3MainDiv.querySelectorAll('.step3').length > 0) {
                            let AllOfSteps = StepOf3MainDiv.querySelectorAll('.step3');
                            if (MainBlk.classList.contains('connected_steps_2')) {
                                MainBlk.classList.remove('connected_steps_2')
                                MainBlk.classList.add('connected_steps_3')
                                AllOfSteps[0].classList.add('active')  
                            }else{
                                MainBlk.classList.add('connected_steps_3')
                                AllOfSteps[0].classList.add('active')  
                            }
                        }
                    }
                    
                })
            });
            
        } 
    }
    MultiFUncMdl()
    function ResetMultiFuncMdl() {
        if (document.querySelectorAll('.multiFuncStepHere').length > 0) {
            let MainBlk = document.querySelector('.multiFuncStepHere')
            if (MainBlk.classList.contains('connected_steps_2')) {
                MainBlk.classList.remove('connected_steps_2')
            }
            if (MainBlk.classList.contains('connected_steps_3')) {
                MainBlk.classList.remove('connected_steps_3')
            }
            document.querySelectorAll('.step2').forEach(lst => {
                lst.classList.remove('active')
            }); 
            document.querySelectorAll('.step3').forEach(lst => {
                lst.classList.remove('active')
            }); 
        }
    }
 



  
 
})(jQuery);
