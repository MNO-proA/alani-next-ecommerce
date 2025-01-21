import React from 'react'

const SuccessPage = () => {

    return (
      <div className={styles["delivery-animation"]}>
        <div className={styles["container"]}>
          <div className={styles["car-wrapper"]}>
            <div className={styles["car-wrapper_inner"]}>
              <div className={styles["car_outter"]}>
                <div className={styles["car"]}>
                  {/* Car body */}
                  <div className={styles["body"]}>
                    <div className={styles["text-container"]}>
                      <h1>Thanks for your order!</h1>
                      <p>Your product is on route.</p>
                    </div>
                  </div>
                  {/* Decorations */}
                  <div className={styles["decos"]}>
                    <div className={styles["line-bot"]}></div>
                    <div className={styles["door"]}>
                      <div className={styles["handle"]}></div>
                      <div className={styles["bottom"]}></div>
                    </div>
                    <div className={styles["window"]}></div>
                    <div className={styles["light"]}></div>
                    <div className={styles["light-front"]}></div>
                    <div className={styles["antenna"]}></div>
                    <div className={styles["ice-cream"]}>
                      <div className={styles["cone"]}></div>
                    </div>
                  </div>
                  {/* Wheels */}
                  <div>
                    <div className={styles["wheel"]}></div>
                    <div className={styles["wheel"]}></div>
                  </div>
                  {/* Wind */}
                  <div className={styles["wind"]}>
                    <div className={`${styles["p"]} ${styles["p1"]}`}></div>
                    <div className={`${styles["p"]} ${styles["p2"]}`}></div>
                    <div className={`${styles["p"]} ${styles["p3"]}`}></div>
                    <div className={`${styles["p"]} ${styles["p4"]}`}></div>
                    <div className={`${styles["p"]} ${styles["p5"]}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Background */}
        <div className={styles["background-stuff"]}>
          <div className={styles["bg"]}></div>
          <div className={`${styles["bg"]} ${styles["bg-2"]}`}></div>
          <div className={`${styles["bg"]} ${styles["bg-3"]}`}></div>
          <div className={styles["ground"]}></div>
        </div>
      </div>
    );
    
  }

  <div className={styles["delivery-animation"]}>
  <div className={styles["car"]}>
    <div className={styles["body"]}></div>
    <div className={styles["wheel"]}></div>
    <div className={styles["wheel"]}></div>
    <div className={styles["light"]}></div>
    <div className={styles["light-front"]}></div>
    <div className={styles["antenna"]}></div>
  </div>
</div>


export default SuccessPage