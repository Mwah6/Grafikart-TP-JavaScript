(function(){
    var scrollY = function() {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }

    //var makeSticky = function (element) {
        window.makeSticky = function (element) {
            // en gros, crée une variable global, permet à la méthode d'être appelé depuis un autre fichier js
         /* Lorsqu'on scrolle
                Si le menu sors de l'écran
                alors il deviendra fixe
            */
            // Variables
            var rect = element.getBoundingClientRect()
            // offset = 0 si element.getAttribute('data-offset') false
            var offset = parseInt(element.getAttribute('data-offset') || 0, 10)          
            console.log(offset)
            if (element.getAttribute('data-constraint')) {
                var constraint = document.querySelector(element.getAttribute('data-constraint'))
            }
            else{
                var constraint = document.body
            }
            var constraintRect = constraint.getBoundingClientRect()
            var constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height
            var top = rect.top + scrollY()
            var fake = document.createElement('div')
            fake.style.width = rect.width + "px"
            fake.style.height = rect.height + "px"
            
           // console.log(top)
            // Fonctions
            var onScroll = function () {
                var hasScrollClass = element.classList.contains('fixed')
                if (scrollY() > constraintBottom && element.style.position != 'absolute') {
                    element.style.position = 'absolute'
                    element.style.bottom ='0'
                    element.style.top ='auto'
                }
                else if (scrollY() > top - offset && scrollY() < constraintBottom && element.style.position != 'fixed') {
                    console.log('add')
                    // console.log("element = " + element.className)
                    // console.log("scrolly = " + scrollY())
                    // console.log("hasScrollClass = " + hasScrollClass)
                    element.classList.add('fixed')
                    element.style.position = 'fixed'
                    element.style.top = offset + "px"
                    element.style.bottom ='auto'
                    element.style.width = rect.width + "px"
                    element.parentNode.insertBefore(fake, element)
                }
                else if (scrollY() < top - offset && element.style.position != 'static') {
                    console.log('remove')
                    // console.log("scrolly = " + scrollY())
                    // console.log("hasScrollClass = " + hasScrollClass)
                    element.style.position = 'static'
                    if (element.parentNode.contains(fake)) {
                        element.parentNode.removeChild(fake)
                    }
                    element.classList.remove('fixed')

                }
            }
            /*
            //*La méthode Element.getBoundingClientRect() retourne un objet DOMRect fournissant des informations sur la taille d'un élément et sa position relative par rapport à la zone d'affichage.
            if (element.getBoundingClientRect().top < 0) {
                element.classList.add('fixed')
                /* Autre solution :
                element.style.position = "fixed"
                element.style.top = "0px"
                //*
            }
            */
            console.log('scroll')
            var onResize = function () {
                // Supprimer ce qui a été fait
                element.style.width = "auto"
                element.classList.remove('fixed')
                element.style.position = 'static'
                fake.style.display = "none"
                constraintRect = constraint.getBoundingClientRect()
                constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height
                top = rect.top + scrollY()
                //Recalcule du rectangle
                rect = element.getBoundingClientRect()
                top = rect.top + scrollY()
                fake.style.width = rect.width + "px"
                fake.style.height = rect.height + "px"
                fake.style.display = "block"
                //recalcule du scroll
                onScroll()
            }
        // Listeners
        window.addEventListener('scroll', onScroll)
        window.addEventListener('resize', onResize)
    }
    var elements = document.querySelectorAll('[data-sticky]')
    for (var i =0; i < elements.length; i++) {
        makeSticky(elements[i])
    }

})()