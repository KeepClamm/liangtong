/**
* Class representing the TimelineTimeline timeline.
*
* Made with Flow
*/

class TimelineTimeline {
    /**
    * @constructor
    *
    * @param {HTMLElement} rootElement
    *   Root Element of the DOM containing the elements that will be animated in this timeline.
    *
    * @param {String} resourcesPath
    *   The path pointing to the root of the Timeline folder.
    */
    constructor(rootElement, elementID, resourcesPath) {
        this.rootElement = rootElement;
        this.elementID = elementID;
        this.resourcesPath = resourcesPath;
        this.imagesFolderPath = resourcesPath + "/img";
        this.loadFillImages();
    }

    /**
    * Returns the timeline's duration in milliseconds.
    */
    get duration() { return 300 }

	loadFillImages() {
        let pattern;
	}
  
    loadSVGAnimations() {
        this.loadSVGShapeAnimations()
        this.loadSVGShapeMaskAnimations()
    }

    loadSVGShapeAnimations() {
        // Path Animations
        let path;
        path = this.rootElement.getElementById("vector-path")
        path.d = "M0.707,0.674c-0.455,0.449,-0.707,1.067,-0.707,1.798 0,0.73,0.253,1.292,0.707,1.798 0.455,0.506,1.061,0.73,1.768,0.73 0.758,0,1.364,-0.225,1.818,-0.674 0.455,-0.449,0.707,-1.067,0.707,-1.798 0,-0.73,-0.253,-1.348,-0.707,-1.798 -0.455,-0.506,-1.061,-0.73,-1.818,-0.73 -0.707,0,-1.313,0.225,-1.768,0.674 0,0,0,0,0,0zM0.707,0.674"
        path.innerHTML = `
                <animate
                  attributeName="d"
                  values="M0.707,0.674c-0.455,0.449,-0.707,1.067,-0.707,1.798 0,0.73,0.253,1.292,0.707,1.798 0.455,0.506,1.061,0.73,1.768,0.73 0.758,0,1.364,-0.225,1.818,-0.674 0.455,-0.449,0.707,-1.067,0.707,-1.798 0,-0.73,-0.253,-1.348,-0.707,-1.798 -0.455,-0.506,-1.061,-0.73,-1.818,-0.73 -0.707,0,-1.313,0.225,-1.768,0.674 0,0,0,0,0,0zM0.707,0.674;M1.131,1.079c-0.727,0.719,-1.131,1.708,-1.131,2.876 0,1.169,0.404,2.067,1.131,2.876 0.727,0.809,1.697,1.169,2.828,1.169 1.212,0,2.182,-0.36,2.909,-1.079 0.727,-0.719,1.131,-1.708,1.131,-2.876 0,-1.169,-0.404,-2.157,-1.131,-2.876 -0.727,-0.809,-1.697,-1.169,-2.909,-1.169 -1.131,0,-2.101,0.36,-2.828,1.079 0,0,0,0,0,0zM1.131,1.079"
                  dur="1s"
                  fill="freeze"
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.68 -0.55 0.265 1.55"
                />
 `

        // Gradient Animations
        let defs;
    } 

    loadSVGShapeMaskAnimations() {    } 

    /**
    * @return
    * Returns the list of svg shapes that are animated in this timeline.
    */
    get allShapes() {
        return [
            this.rootElement.querySelector(`${this.elementID} .形状-svg`),
            this.rootElement.querySelector(`${this.elementID} .形状_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .矩形-svg`),
            this.rootElement.querySelector(`${this.elementID} .形状_2-svg`),
            this.rootElement.querySelector(`${this.elementID} .形状_3-svg`),
            this.rootElement.querySelector(`${this.elementID} .路径-svg`),
            this.rootElement.querySelector(`${this.elementID} .路径_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .形状_4-svg`),
            this.rootElement.querySelector(`${this.elementID} .椭圆形-svg`),
            this.rootElement.querySelector(`${this.elementID} .rectangle_2070-svg`),
            this.rootElement.querySelector(`${this.elementID} .union-svg`),
            this.rootElement.querySelector(`${this.elementID} .vector-svg`),
            this.rootElement.querySelector(`${this.elementID} .i-svg`),
            this.rootElement.querySelector(`${this.elementID} .s-svg`),
            this.rootElement.querySelector(`${this.elementID} .t-svg`),
            this.rootElement.querySelector(`${this.elementID} .union_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .c-svg`),
            this.rootElement.querySelector(`${this.elementID} .k-svg`),
        ]
    }

    形状_opacity1_Track() {
        const element = this.rootElement.querySelector(`${this.elementID} .形状_1`);
        return element.animate({
            opacity: [1, 1, 0, 0],
            easing: ["linear", "ease-in-out", "ease-in-out"],
            offset: [0, 0.14, 0.44, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    矩opacity形_Track() {
        const element = this.rootElement.querySelector(`${this.elementID} .矩形`);
        return element.animate({
            opacity: [1, 1, 0, 0],
            easing: ["linear", "ease-in-out", "ease-in-out"],
            offset: [0, 0.12, 0.42, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    形状_opacity2_Track() {
        const element = this.rootElement.querySelector(`${this.elementID} .形状_2`);
        return element.animate({
            opacity: [1, 1, 0, 0],
            easing: ["linear", "ease-in-out", "ease-in-out"],
            offset: [0, 0.1, 0.4, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    形状_opacity3_Track() {
        const element = this.rootElement.querySelector(`${this.elementID} .形状_3`);
        return element.animate({
            opacity: [1, 1, 0, 0],
            easing: ["linear", "ease-in-out", "ease-in-out"],
            offset: [0, 0.08, 0.38, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    路opacity径_Track() {
        const element = this.rootElement.querySelector(`${this.elementID} .路径`);
        return element.animate({
            opacity: [1, 1, 0, 0],
            easing: ["linear", "ease-in-out", "ease-in-out"],
            offset: [0, 0.06, 0.36, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    路径_opacity1_Track() {
        const element = this.rootElement.querySelector(`${this.elementID} .路径_1`);
        return element.animate({
            opacity: [1, 1, 0, 0],
            easing: ["linear", "ease-in-out", "ease-in-out"],
            offset: [0, 0.04, 0.34, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    形状_opacity4_Track() {
        const element = this.rootElement.querySelector(`${this.elementID} .形状_4`);
        return element.animate({
            opacity: [1, 1, 0, 0],
            easing: ["linear", "ease-in-out", "ease-in-out"],
            offset: [0, 0.02, 0.32, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    椭圆opacity形_Track() {
        const element = this.rootElement.querySelector(`${this.elementID} .椭圆形`);
        return element.animate({
            opacity: [1, 0, 0],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.3, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    rectangle_2070_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .rectangle_2070`);
        return element.animate({
            left: ['144.75px', '51px'],
            easing: ["ease-in-out"],
            offset: [0, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    rectangle_2070_topTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .rectangle_2070`);
        return element.animate({
            top: ['29.84px', '30px'],
            easing: ["ease-in-out"],
            offset: [0, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    rectangle_2070_opacityTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .rectangle_2070`);
        return element.animate({
            opacity: [1, 0, 0],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.3, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    vector_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .vector`);
        return element.animate({
            left: ['153.7px', '40px', '42px'],
            easing: ["ease-in-out", "cubic-bezier(0.455, 0.03, 0.515, 0.955)"],
            offset: [0, 0.8, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    vector_topTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .vector`);
        return element.animate({
            top: ['28.03px', '42px', '42px'],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.8, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    vector_widthTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .vector`);
        return element.animate({
            width: ['5px', '8px'],
            easing: ["cubic-bezier(0.68, -0.55, 0.265, 1.55)"],
            offset: [0, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    vector_heightTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .vector`);
        return element.animate({
            height: ['5px', '8px'],
            easing: ["cubic-bezier(0.68, -0.55, 0.265, 1.55)"],
            offset: [0, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    i_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .i`);
        return element.animate({
            left: ['154px', '60px', '60px'],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.76, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    i_topTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .i`);
        return element.animate({
            top: ['35.25px', '35px', '35px'],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.76, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    i_opacityTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .i`);
        return element.animate({
            opacity: [1, 1, 0, 0],
            easing: ["linear", "cubic-bezier(0.77, 0, 0.175, 1)", "ease-in-out"],
            offset: [0, 0.1, 0.7, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    s_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .s`);
        return element.animate({
            left: ['161.5px', '68px', '68px'],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.76, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    s_topTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .s`);
        return element.animate({
            top: ['28.8px', '29px', '29px'],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.76, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    s_opacityTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .s`);
        return element.animate({
            opacity: [1, 1, 0, 0],
            easing: ["linear", "ease-in-out", "ease-in-out"],
            offset: [0, 0.08, 0.68, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    t_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .t`);
        return element.animate({
            left: ['176.5px', '83px', '83px'],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.76, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    t_topTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .t`);
        return element.animate({
            top: ['30.5px', '31px', '31px'],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.76, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    t_opacityTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .t`);
        return element.animate({
            opacity: [1, 1, 0, 0],
            easing: ["linear", "ease-in-out", "ease-in-out"],
            offset: [0, 0.06, 0.66, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    union_1_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .union_1`);
        return element.animate({
            left: ['188.16px', '94px', '94px'],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.76, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    union_1_topTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .union_1`);
        return element.animate({
            top: ['32.52px', '33px', '33px'],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.76, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    union_1_opacityTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .union_1`);
        return element.animate({
            opacity: [1, 1, 0, 0],
            easing: ["linear", "ease-in-out", "ease-in-out"],
            offset: [0, 0.04, 0.64, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    c_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .c`);
        return element.animate({
            left: ['210.68px', '117px', '117px'],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.76, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    c_opacityTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .c`);
        return element.animate({
            opacity: [1, 1, 0, 0],
            easing: ["linear", "ease-in-out", "ease-in-out"],
            offset: [0, 0.02, 0.62, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    k_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .k`);
        return element.animate({
            left: ['225.5px', '132px', '132px'],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.76, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    k_topTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .k`);
        return element.animate({
            top: ['28.5px', '29px', '29px'],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.76, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    k_opacityTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .k`);
        return element.animate({
            opacity: [1, 0, 0],
            easing: ["ease-in-out", "ease-in-out"],
            offset: [0, 0.5, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }

        /**
        * Creates and returns all animations for this timeline.
        */
        createAllAnimations() {
            return [
                this.形状_opacity1_Track(),
                this.矩opacity形_Track(),
                this.形状_opacity2_Track(),
                this.形状_opacity3_Track(),
                this.路opacity径_Track(),
                this.路径_opacity1_Track(),
                this.形状_opacity4_Track(),
                this.椭圆opacity形_Track(),
                this.rectangle_2070_leftTrack(),
                this.rectangle_2070_topTrack(),
                this.rectangle_2070_opacityTrack(),
                this.vector_leftTrack(),
                this.vector_topTrack(),
                this.vector_widthTrack(),
                this.vector_heightTrack(),
                this.i_leftTrack(),
                this.i_topTrack(),
                this.i_opacityTrack(),
                this.s_leftTrack(),
                this.s_topTrack(),
                this.s_opacityTrack(),
                this.t_leftTrack(),
                this.t_topTrack(),
                this.t_opacityTrack(),
                this.union_1_leftTrack(),
                this.union_1_topTrack(),
                this.union_1_opacityTrack(),
                this.c_leftTrack(),
                this.c_opacityTrack(),
                this.k_leftTrack(),
                this.k_topTrack(),
                this.k_opacityTrack(),
            ].flat()
        }
}

// https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/composite
    TimelineTimeline.composite = {
        ADD: 'add',
        REPLACE: 'replace',
        ACCUMULATE: 'accumulate',
    }

// https://developer.mozilla.org/en-US/docs/Web/API/EffectTiming/fill
    TimelineTimeline.fill = {
        NONE: 'none',
        FORWARDS: 'forwards',
        BACKWARDS: 'backwards',
        BOTH: 'both',
        AUTO: 'auto',
    }

Object.freeze(TimelineTimeline)
