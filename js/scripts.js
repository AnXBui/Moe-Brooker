
	const cursor = document.querySelector('.customCursor');

	const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
		if (!e) e = window.event;
		if (e.pageX || e.pageY) {
            posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
        return { x : posx, y : posy }
    }


    class HoverImgF {
            constructor(el) {
                this.DOM = {el: el};
                this.DOM.reveal = document.createElement('div');
                this.DOM.reveal.className = 'hover-reveal';
								// this.DOM.reveal.setAttribute("align","center");
                this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
                this.DOM.el.appendChild(this.DOM.reveal);
                this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
                this.DOM.revealInner.style.overflow = 'hidden';
                this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');

                this.initEvents();
            }
            initEvents() {
                this.positionElement = (ev) => {
                    const mousePos = getMousePos(ev);
                    const docScrolls = {
                        left : document.body.scrollLeft + document.documentElement.scrollLeft,
                        top : document.body.scrollTop + document.documentElement.scrollTop
                    };
										const objectWidth = this.DOM.reveal.offsetWidth / 2;
										const objectHeight = this.DOM.reveal.offsetHeight / 2;
                    this.DOM.reveal.style.top = `${mousePos.y-objectHeight-docScrolls.top}px`;
                    this.DOM.reveal.style.left = `${mousePos.x-objectWidth-docScrolls.left}px`;
                };
                this.mouseenterFn = (ev) => {
                    this.positionElement(ev);
                    this.showImage();
                };
                this.mousemoveFn = ev => requestAnimationFrame(() => {
                    this.positionElement(ev);
                });
                this.mouseleaveFn = () => {
                    this.hideImage();
                };

                this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
                this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
                this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
            }
            showImage() {
								gsap.killTweensOf(this.DOM.revealInner);
                gsap.killTweensOf(this.DOM.revealImg);

                this.tl = gsap.timeline({
                    onStart: () => {
                        this.DOM.reveal.style.opacity = 1;
                        gsap.set(this.DOM.el, {zIndex: 1000});
                    }
                })
                .add('begin')
                .fromTo(this.DOM.revealInner, 0.4, {x: '-100%', y: '-100%'},{
                    // ease: Quint.easeOut,
										ease:"power1.out",

                    x: '0%',
                    y: '0%'
                }, 'begin')
                .fromTo(this.DOM.revealImg, 0.4,{x: '100%', y: '100%'},{
                    // ease: Quint.easeOut,
										ease:"power1.out",
                    x: '0%',
                    y: '0%'
                }, 'begin');

								gsap.to(cursor,0.25,{scaleX:0, scaleY:0});
            }
            hideImage() {
                gsap.killTweensOf(this.DOM.revealInner);
                gsap.killTweensOf(this.DOM.revealImg);

                this.tl = gsap.timeline({
                    onStart: () => {
                        gsap.set(this.DOM.el, {zIndex: 999});
                    },
                    onComplete: () => {
                        gsap.set(this.DOM.el, {zIndex: ''});
                        gsap.set(this.DOM.reveal, {opacity: 0});
                    }
                })
                .add('begin')
                .to(this.DOM.revealInner, 0.3, {
                    // ease: Quint.easeOut,
										ease:"power1.in",

                    x: '100%',
                    y: '100%'
                }, 'begin')

                .to(this.DOM.revealImg, 0.3, {
                    // ease: Quint.easeOut,
										ease:"power1.in",

                    x: '-100%',
                    y: '-100%'
                }, 'begin');
								gsap.to(cursor,0.25,{scaleX:1, scaleY:1});

            }
        }

[...document.querySelectorAll('[data-fx="1"] a')].forEach(link => new HoverImgF(link));


class HomeLink{
	constructor(el) {
			this.DOM = {el: el};
			this.DOM.origin = this.DOM.el.querySelector('.homeLinkUnit');
			this.DOM.copy = this.DOM.origin.cloneNode(true);
			this.DOM.el.appendChild(this.DOM.origin.cloneNode(true));
			this.DOM.el.appendChild(this.DOM.origin.cloneNode(true));
			this.DOM.el.appendChild(this.DOM.origin.cloneNode(true));
			this.DOM.el.appendChild(this.DOM.origin.cloneNode(true));
			this.DOM.el.appendChild(this.DOM.origin.cloneNode(true));
			this.DOM.link = this.DOM.el.querySelectorAll('.homeLinkUnit');
			this.DOM.link.width = this.DOM.origin.offsetWidth;
			console.log(this.DOM.link.width);
			this.initEvents();
	}

	initEvents(){
		this.tl = gsap.timeline()
		.to(this.DOM.link, 15,{x:"-="+this.DOM.link.width, repeat:-1, ease:"linear"});
	}
}

[...document.querySelectorAll('.homeLink')].forEach(link => new HomeLink(link));

function cursorInit(){
	console.log('run');

	document.addEventListener("mousemove", e => {
		const mousePos = getMousePos(e);
		console.log(mousePos.x,mousePos.y);
		gsap.to(cursor,0.15,{x:mousePos.x , y:mousePos.y});
	});

	// document.querySelectorAll('a[data-curosr="0"]').addEventListener
}

cursorInit();
