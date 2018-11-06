$(document).ready(function() {

	//slide2id - плавная прокрутка по ссылкам внутри страницы
	$("nav a, a.mouse_scroll").mPageScroll2id({
	    highlightSelector:"nav a"
	});

	// MixItUp - фильтрация работ в портфолио
	$('#portfolio-projects').mixItUp();
 
    $('.filter-block__button').on('click', function(){
		
		var activeClass= 'filter-block__button--active';
		var currentActiveElement = findElementByClass('.filter-block', '.' +  activeClass);
				
		if (!$(this).hasClass(activeClass)) {
			$(currentActiveElement).removeClass(activeClass);
		 	$(this).addClass(activeClass);
		}		
	});

	function findElementByClass(mainClass, classToFind) {
		return $(mainClass).find(classToFind);
	};

	// FancyBox - galery
	$(".fancybox").fancybox({
			// Default - with fix from scroll to top
            helpers: {
                overlay: {
                    locked: false
                }
            }
    });
	// End of FancyBox - galery
    
    // jQuery validate js
    $("#contact-form").validate({
        rules: {
            name: { required: true },
            email: { required: true, email: true },
            //phone: { required: true },
            //skype: { required: true }
            message: { required: true }
        },
        
        messages: {
            name: "Пожалуйста, введите свое имя",
            email: {
                required: "Пожалуйста введите свой email",
                email: "Email адрес должен быть в формате name@domain.com. Возможно вы ввели email с ошибкой."
            },
            message: "Пожалуйста, введите текст сообщения"
        },
        submitHandler: function(form) {
		  ajaxFormSubmit();
		}
    })
    // Функция AJAX запрса на сервер
	function ajaxFormSubmit(){
		var string = $("#contact-form").serialize(); // Соханяем данные введенные в форму в строку. 

		// Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string
			
			// Функция если все прошло успешно
			success: function(html){
				$("#contact-form").slideUp(800);
				$('#answer').html(html);
			}
		});

		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false; 
	}

}); 