(($)=>{

  class Pofo { 

    init(){
      this.header();
      this.section1();
      this.section2();
      this.section3();
      this.section4();
      this.section5();
      this.section6();
      this.section7();
      this.section8();
      this.section9();

      this.quick();
      this.goTop();
    }
    header(){
      let t = false ; //mobile
      let t2 = false ; //pc
        //모바일 메뉴 버튼 이벤트

      $('.mobile-btn').on({
        click:function(){
        $(this).toggleClass('on');
        $('#nav').stop().slideToggle(300);
      }
    });

    //기본값
    $('.sub').stop().slideUp(0);

      //반응형
      $(window).resize(function(){
        resizeNav();
      });

      function resizeNav(){
        if($(window).width()<=1024){
          $('.mobile-btn').removeClass('on');
          $('#nav').stop().hide();
          t2=false;
          if(t===false){
              t=true;
            // 마우스 오버 이벤트 삭제
            $('.sub').stop().fadeOut(0) //초기화
              $('.main-btn').off('mouseenter');
              //on끼리 충돌나서 bind 로 변경
              $('.main-btn').bind({
                click:function(){
                  //아코디언 모드 다른 메뉴 누르면 접히게
                  $('.sub').stop().slideUp(0)
                  $(this).next().stop().slideToggle(300)
                 }
              });
            }
        }
        else{
          $('.mobile-btn').removeClass('on');
          $('#nav').stop().show();
          t=false //모바일 초기화
          if(t2===false){
          //메인 1024 초과인 해상도 
            t2=true;
          //초기화
          $('.main-btn').off('click')
          $('.main-btn').on(' mouseenter')
          $('.sub').stop().slideUp(0)

          $('.main-btn').on({
            mouseenter:function(){
              $('.sub').fadeOut(0)
              $(this).next().fadeIn(300)
            }
          });
        $('#nav').on({
          mouseleave:function(){
            $('.sub').fadeOut(300)
          }
        });
          
          //서브 서브
        $('.sub-btn').on({
          mouseenter:function(){
            $('.sub-sub').fadeOut(0)
            $(this).next().fadeIn(300)
          }
        });
        $('.col24').on({
          mouseleave:function(){
            $('.sub-sub').fadeOut(300)
            }
          });
        }
      }
    }

      resizeNav();


        let upDown = '';
        let newTop= $(window).scrollTop();
        let oldTop = newTop; 

        $(window).scroll(()=>{

          newTop= $(window).scrollTop();
          upDown = oldTop - newTop > 0 ? 'UP' : 'DOWN';

          if(upDown==='UP'){
            $('#header').addClass('show')
            $('#header').removeClass('hide')
          }
          if(upDown==='DOWN'){
            $('#header').addClass('hide')
            $('#header').removeClass('show')
          }
          if($(window).scrollTop()===0){
            $('#header').removeClass('show')
          }

          oldTop = newTop; 
            });


    }
    section1(){
      let cnt = 0;
      let n = $('#section1 .slide').length-3; 
      let setId = 0 ;
      let setId2 = 0 ;
      //터치 스와이프
      let touStart = null;
      let touEnd = null;
      let result = '';

      //드래그앤드롭
      let dragStart = null;
      let dragEnd = null;
      let mouseDown =false;

      //슬라이드 너비 반응형 구하기
      //너비와 높이가 단 1픽셀이라도 변경되면 동작한다.
      //크기 변경이 없으면 절대 동작 하지 않는다
      let winW = $(window).width(); // 창 너비 초기값


      $(window).resize(function(){
        winW = $(window).width();
        mainSlide() // 즉각 실행 (멈칫함X)
        return winW; //반응형 창 너비
      });


      //1.메인슬라이드
      function mainSlide(){
        $('#section1  .slide-wrap').stop().animate({left:-winW*cnt},600,'easeInOutExpo',function(){
          cnt>2?cnt=0:cnt;
          cnt<0?cnt=2:cnt;
        $('#section1  .slide-wrap').stop().animate({left:-winW*cnt}, 0 ) 
        })
      }
      //2-1.다음카운트
      function nextCount(){
        cnt++;
        mainSlide();
      }
      //2-2.이전카운트
      function prevCount(){
        cnt--;
        mainSlide();
      }      
      //3.자동타이머
      function autoTimer(){
        setId=setInterval(nextCount, 3000)
      }
      autoTimer()

      //타이머 중지 함수
      function timerfn(){
        let cnt2 = 0 ;
        clearInterval(setId); //자동 타이머 중지
        clearInterval(setId2); // 자동 타이머 중지 - 중복 되지 않게
        setId2=setInterval(function(){ //다시 리턴
          cnt2++;

          if(cnt2>=2){ // 2초간 아무 터치 없으면 자동타이머 호출 실행
            clearInterval(setId); 
            clearInterval(setId2); // 카운트 이제 그만 - 자동타이머 실행
            //nextCount(); // 즉시 실행
            autoTimer(); // 자동타이머 호출 실행 후에 3초 (nextCount, 3000) 2초+3초 = 5초
          }
        },1000)  
      }

      $('#section1  .slide-container').on({
        mousedown:function(e){
          //중지되고 난 후 5초간 아무 터치가 없으면 다시
          //자동타임를 호출 실행
          timerfn();

          touStart = e.clientX;
          dragStart = e.clientX-$('#section1  .slide-wrap').offset().left-winW;
          mouseDown =true;
        },
        mouseup:function(e){
          touEnd=e.clientX;
          result = touStart-touEnd > 0 ? 'NEXT' : 'PREV';
          if(result==='NEXT'){
            if(!$('#section1 .slide-wrap').is(':animated')){
            nextCount(); //다음 슬라이드
            }
          }
          if(result==='PREV'){
            if(!$('#section1 .slide-wrap').is(':animated')){
              prevCount();
              }
          }
           mouseDown =false
        },
        mouseleave:function(e){
          if(!mouseDown){return;}
          touEnd=e.clientX;
          result = touStart-touEnd > 0 ? 'NEXT' : 'PREV';
          if(result==='NEXT'){
            nextCount()
          }
          if(result==='PREV'){
            prevCount()
          }
           mouseDown =false
        },
        mousemove:function(e){
        if(!mouseDown){return;}
        dragEnd = e.clientX;
        $('#section1  .slide-wrap').css({left:dragEnd-dragStart});
        }

      });
      //모바일 전용 핑거 터치 이벤트
      $('#section1  .slide-container').on({
        touchstart:function(e){ //mousedown 같은 의미(모바일용)
          timerfn();
          touStart = e.originalEvent.changedTouches[0].clientX; //변수
          dragStart = e.originalEvent.changedTouches[0].clientX-$('#section1  .slide-wrap').offset().left-winW;
          mouseDown =true;
        },
        touchend:function(e){ //mouseup 같은 의미(모바일용)
          touEnd = e.originalEvent.changedTouches[0].clientX;
          result = touStart-touEnd > 0 ? 'NEXT' : 'PREV';
          if(result==='NEXT'){
            if(!$('#section1  .slide-wrap').is(':animated')){
            nextCount(); //다음 슬라이드
            }
          }
          if(result==='PREV'){
            if(!$('#section1  .slide-wrap').is(':animated')){
            prevCount();
            }
          }
          mouseDown =false
        },
        touchmove:function(e){ //mousemove 같은 의미(모바일용)
          if(!mouseDown){return;}
          dragEnd = e.originalEvent.changedTouches[0].clientX;
          $('#section1  .slide-wrap').css({left:dragEnd-dragStart});                         
        }
      })


    }
    section2(){
      //스크롤 이벤트
      //섹션2번이 노출되면 패럴럭스 구현 추가 클래스 sec2Ani 
      const sec2Top = $('#section2').offset().top-$(window).height();
      $(window).scroll(function(){
        if($(window).scrollTop() > sec2Top){
          $('#section2').addClass('sec2Ani')
          return; 
        }
        if($(window).scrollTop()===0){
          $('#section2').removeClass('sec2Ani')
          return;
        }
      });

    }
    section3(){
      const sec3Top = $('#section3').offset().top-$(window).height();
      $(window).scroll(function(){
        if($(window).scrollTop() > sec3Top){
          $('#section3').addClass('sec3Ani')
          return;
        }
        if($(window).scrollTop()===0){
          $('#section3').removeClass('sec3Ani')
          return;
        }
      });
    }
    section4(){      
      let idx = 0;
      let winW = $(window).width();
      let cols = 4; //해상도 크기별 조건문 4 3 2 1
      let imgW = winW/cols;
      let imgH = imgW*0.8125;
      let n = $('#section4 .gallery-item').length;
      let h = $('#section4 .gallery-item.hide').length;
      let rows = Math.ceil((n-h)/cols);

      //스크롤 이벤트: 패럴럭스 (parallx)
      let sec4Top = $('#section4').offset().top-$(window).height();
      let scr = false;

                      // 섹션4의 창 높이 - 창 높이
      $(window).scroll(function(){
        if($(window).scrollTop() === 0){
          scr=false; // 다시 초기화
          $('#section4').removeClass('sec4Ani');

        }
        if($(window).scrollTop() >= sec4Top ){
          if(scr===false){
              scr=true; //애니메이션 1회만 진행했다.
              $('#section4').addClass('sec4Ani');
          }
      }
      });

       setTimeout(galleryMain, 100);

          //반응형 윈도우 리사이즈 <- 크기가 변경되면 구현
          $(window).resize(function(){              
              galleryMain();
          });

          $('#section4 .gallery-btn').each(function(index){
              $(this).on({
                click: function(e){
                  e.preventDefault();
                  idx = index; //클릭한 인덱스 번호
                  galleryMain();
                  $('#section4 .gallery-btn').removeClass('on');
                  $(this).addClass('on');
                  $('#section4').removeClass('sec4Ani')
                  
                }           
              });
          });

          // 갤러리 이미지 재배치 함수
          function galleryMain(){

            winW = $(window).width();
            if(winW>=1280){
                cols = 4;
            }
            else if(winW>=1024){ //1024~1279
                cols = 3;
            }
            else if(winW>=600){ //600~1023
                cols = 2;
            }
            else { //320~599
                cols = 1;
            }
            imgW = winW/cols;
            imgH = imgW*0.8125;
            
            $('.gallery-item').removeClass('zoom'); //줌 효과 삭제 초기화
            $('.gallery-item').stop().animate({width:imgW,height:imgH}).removeClass('hide'); //초기화
            $('.gallery-item .img-wrap').css({width:imgW});
            
            if(idx===0){
              switch(cols){
                case 4:
                  $('.gallery-item').eq(0).show().stop().animate({left:imgW * 0,top:imgH * 0}, 300);
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW * 1,top:imgH * 0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW * 2,top:imgH * 0}, 300);
                  $('.gallery-item').eq(3).show().stop().animate({left:imgW * 3,top:imgH * 0}, 300);
                  $('.gallery-item').eq(4).show().stop().animate({left:imgW * 0,top:imgH * 1}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW * 1,top:imgH * 1}, 300);
                  $('.gallery-item').eq(6).show().stop().animate({left:imgW * 2,top:imgH * 1}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW * 3,top:imgH * 1}, 300);
                break;
                case 3:
                  $('.gallery-item').eq(0).show().stop().animate({left:imgW * 0,top:imgH * 0}, 300);
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW * 1,top:imgH * 0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW * 2,top:imgH * 0}, 300);
                  $('.gallery-item').eq(3).show().stop().animate({left:imgW * 0,top:imgH * 1}, 300);
                  $('.gallery-item').eq(4).show().stop().animate({left:imgW * 1,top:imgH * 1}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW * 2,top:imgH * 1}, 300);
                  $('.gallery-item').eq(6).show().stop().animate({left:imgW * 0,top:imgH * 2}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW * 1,top:imgH * 2}, 300);
                break;
                case 2:
                  $('.gallery-item').eq(0).show().stop().animate({left:imgW * 0,top:imgH * 0}, 300);
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW * 1,top:imgH * 0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW * 0,top:imgH * 1}, 300);
                  $('.gallery-item').eq(3).show().stop().animate({left:imgW * 1,top:imgH * 1}, 300);
                  $('.gallery-item').eq(4).show().stop().animate({left:imgW * 0,top:imgH * 2}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW * 1,top:imgH * 2}, 300);
                  $('.gallery-item').eq(6).show().stop().animate({left:imgW * 0,top:imgH * 3}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW * 1,top:imgH * 3}, 300);
                break;
                default:
                  $('.gallery-item').eq(0).show().stop().animate({left:imgW * 0,top:imgH * 0}, 300);
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW * 0,top:imgH * 1}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW * 0,top:imgH * 2}, 300);
                  $('.gallery-item').eq(3).show().stop().animate({left:imgW * 0,top:imgH * 3}, 300);
                  $('.gallery-item').eq(4).show().stop().animate({left:imgW * 0,top:imgH * 4}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW * 0,top:imgH * 5}, 300);
                  $('.gallery-item').eq(6).show().stop().animate({left:imgW * 0,top:imgH * 6}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW * 0,top:imgH * 7}, 300);
              }
            }
            else if(idx===1){ 
              $('.gallery-item').eq(0).hide().addClass('hide');
              $('.gallery-item').eq(2).hide().addClass('hide');
              $('.gallery-item').eq(3).hide().addClass('hide');
              $('.gallery-item').eq(4).hide().addClass('hide');
              $('.gallery-item').eq(6).hide().addClass('hide');
              switch(cols){
                case 4:
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                break;
                case 3:
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                break;
                case 2:
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                break;
                default:
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                }

              
            }
            else if(idx===2){
              $('.gallery-item').eq(3).hide().addClass('hide');
              $('.gallery-item').eq(7).hide().addClass('hide');
              switch(cols){
                case 4:
                  $('.gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                  $('.gallery-item').eq(4).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  $('.gallery-item').eq(6).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                break;
                case 3:
                  $('.gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                  $('.gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                  $('.gallery-item').eq(6).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
                break;
                case 2:
                  $('.gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  $('.gallery-item').eq(4).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                  $('.gallery-item').eq(6).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
                break;
                default:
                  $('.gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                  $('.gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
                  $('.gallery-item').eq(6).show().stop().animate({left:imgW*0,top:imgH*5}, 300);

              }

            }
            else if(idx===3){ 
                  $('.gallery-item').eq(1).hide().addClass('hide');
                  $('.gallery-item').eq(3).hide().addClass('hide');
                  $('.gallery-item').eq(6).hide().addClass('hide');
                  $('.gallery-item').eq(7).hide().addClass('hide');
              switch(cols){
                case 4:
                  $('.gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  $('.gallery-item').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
                break;
                case 3:
                  $('.gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  $('.gallery-item').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                break;
                case 2:
                  $('.gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  $('.gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                break;
                default:
                  $('.gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  $('.gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
              }

            }
            else if(idx===4){
              $('.gallery-item').eq(0).hide().addClass('hide');
              $('.gallery-item').eq(1).hide().addClass('hide');
              $('.gallery-item').eq(2).hide().addClass('hide');
              $('.gallery-item').eq(4).hide().addClass('hide');
              $('.gallery-item').eq(5).hide().addClass('hide');
              $('.gallery-item').eq(6).hide().addClass('hide');
              switch(cols){
                case 4:
                  $('.gallery-item').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                break;
                case 3:
                  $('.gallery-item').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                break;
                case 2:
                  $('.gallery-item').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                break;
                default:
                  $('.gallery-item').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              }

            }
            else if(idx===5){
              $('.gallery-item').eq(0).hide().addClass('hide');
              $('.gallery-item').eq(4).hide().addClass('hide');
              $('.gallery-item').eq(6).hide().addClass('hide');
              switch(cols){
                case 4:
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  $('.gallery-item').eq(3).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                break;
                case 3:
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  $('.gallery-item').eq(3).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                break;
                case 2:
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  $('.gallery-item').eq(3).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                break;
                default:
                  $('.gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  $('.gallery-item').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  $('.gallery-item').eq(3).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                  $('.gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                  $('.gallery-item').eq(7).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
              }

            }


            // hide 클래스가 몇개니?
            h = $('.gallery-item.hide').length;
            rows = Math.ceil((n-h)/cols);     //줄수는 hide  갯수를 가져온뒤에 높이를 정한다. 

            $('.gallery-wrap').stop().animate({height:imgH*rows }, 300); //갤러리 전체 박스높이
            //줌 효과
            $('.gallery-item').addClass('zoom');


          }  //갤러리 함수

    }
    section5(){
      //SVG 애니메이션 - 시간과 픽셀 수를 가지고 움직이는 애니메이션 창작하는 것
      //1. SVG 원형 총(Total) rlfdl(Lenght)를 구한다 (가져오기get) 겟 토탈 랭스
      //getTotalLength(); //SVG 원형 객체의 총 길이를 px 단위로 구한다.
      //원형박스선택자 자식요소 circle 그래픽 디자인 요소
      let sec5Top = $('#section5').offset().top-$(window).height();
      let t = false // 토글 toggel 한번은 false(0) 또 한번은 true(1)

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          t=false;
          $('#section5').removeClass('sec5Ani')
        }
        if($(window).scrollTop()>sec5Top){
          if(t===false){
            t=true;
            $('#section5').addClass('sec5Ani');
            svgAnimation();
          }
        }
      })

      function svgAnimation(){
        const svgObj = $('.ring-front circle');
        let svgArr = [] // 원형 svg 배열 //총 길이
        let piece = [] // 1마디 총 4개 = 픽셀의 갯수 
        let perSize = [] // 퍼센트 사이즈
        let per = [.9,.75,.9,.62] // 순서대로 (0,1,2,3) 90퍼 75퍼 90퍼 62퍼
        let second = 3; //3번
        let sum = [0,0,0,0] ;  // 합계의 길이 = 퍼센트 길이
        let setId = [0,0,0,0];
  
        $.each(svgObj,function(idx, obj){ // 원형 4개를 반복처리
            // console.log( idx , obj, obj.getTotalLength()); //0 원형요소
  
            //1.총 길이
            svgArr[idx] = obj.getTotalLength(); // 4개가 배열에 저장
  
            //2. 각 요소의 전체 길이 대입 (배열안에서 하기) : 초기 설정 (굵은 선 출발 전 안 보임) = 초기화
            //jQuery
            //obj.style.strokeDasharray= svgArr[idx]; // = 461.0681457519531 원형 길이 //strokeDasharray = 대시의 간격
            //obj.style.strokeDashoffset= svgArr[idx];
  
            //css
            $(obj).css({strokeDasharray: svgArr[idx]})
            $(obj).css({strokeDashoffset: svgArr[idx]})
  
            //3. 각 요소의 퍼센트의 길이 (ex.90% 75%)
            //퍼센트 배열 변수 필요
                     //= 461.0681457519531 원형 길이 css 와 동일
            //perSize[0] = svgArr[0] * 0.9; //90퍼 
            //perSize[1] = svgArr[1] * 0.75; //75퍼
            //perSize[2] = svgArr[2] * 0.9; //90퍼
            //perSize[3] = svgArr[3] * 0.62; //62퍼
            //==같은 내용
            //idx는 배열
            perSize[idx] = svgArr[idx] * per[idx]
            
            //4. 각 요소의 토막(마디)의 길이를 구한다
            // 마디 배열 변수 필요
            piece[idx] = (perSize[idx]/second)/100; //1000 에서 100
            
            //5. 마디를 카운트(setTimer 이용)
            function sumfun(){
              //[] <= 누적 합계
              sum[idx] += piece[idx];  // 합계의 길이 = 퍼센트 길이
              if(sum[idx] > perSize[idx] ){ // 합계의 길이가 선 길이 보다 크면
                clearInterval(setId[idx]); //타이머를 멈춰라
              }
              else{
              $(obj).css({strokeDashoffset: svgArr[idx]-sum[idx] });
                
              
                //숫자
                //현재 누적 값 / 전체길이 ex) 50/100 
                //Math - 수학 계산 
              $('.count-num').eq(idx).html(Math.ceil(sum[idx]/svgArr[idx]*100) + '%');//소수점 자리 올리기 위해 *100
              }
            }
  
                //ps. 애니메이션 구현
                //테스트: 아이체크 - 마디가 더했을 때 애니메이션이 되는지 / 마디가 얼마나 오는지
                //$(obj).css({strokeDashoffset: svgArr[idx]-(piece[idx]*100) }) //strokeDashoffset = 대시의 시작점이 이동시키는 속성
                //console.log((perSize[idx]*100))
  
  
            //6. 타이머설정(setInterval)
            setId[idx] = setInterval(sumfun,10); //1/100 = 10  0.01초
  
        });
      }


      //console.log('[0]총 길이' ,svgArr[0]);
      //console.log('[0]퍼센트 길이' ,perSize[0]);
      //console.log('[0]한마디의 길이' ,piece[0]);

    }
    section6(){
      let sec6Top = $('#section6').offset().top-$(window).height();
      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section6').removeClass('sec6Ani')
        }
        if($(window).scrollTop()>sec6Top){
            $('#section6').addClass('sec6Ani');  
        }
      })
    }
    section7(){
      let winH = $(window).height();
      let sec7Top = $('#section7').offset().top-winH

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section7').removeClass('sec7Ani')
        }
        if($(window).scrollTop() > sec7Top){
          $('#section7').addClass('sec7Ani')
        }

      })
    }
    section8(){
      let winH = $(window).height();
      let sec8Top = $('#section8').offset().top-winH

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section8').removeClass('sec8Ani')
        }
        if($(window).scrollTop() > sec8Top){
          $('#section8').addClass('sec8Ani')
        }

      })
    }

    section9(){
      let winH = $(window).height();
      let sec9Top = $('#section9').offset().top-winH

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section9').removeClass('sec9Ani')
        }
        if($(window).scrollTop() > sec9Top){
          $('#section9').addClass('sec9Ani')
        }

      })
    }













    quick(){
      let quickTop = ($(window).height()-$('#quick').height())/2-250;
      $(window).scroll(function(){
        $('#quick').stop().animate({top:quickTop+$(window).scrollTop()},100 , 'easeInOutExpo')
      })
    }
    goTop(){
      $(window).scroll(function(){
        if($(window).scrollTop()>100){
          $('#goTop').stop().fadeIn(1000)
        }
        else{
          $('#goTop').stop().fadeOut(1000)

        }
      });

      $('#goTop').on({
        click:function(){
          $('html,body').stop().animate({scrollTop:0},500)
        }
      });
    }
  }
  const newPofo = new Pofo()
  newPofo .init();

})(jQuery);