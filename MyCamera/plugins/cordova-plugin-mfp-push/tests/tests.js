/**
 * @license
   Licensed Materials - Property of IBM

   (C) Copyright 2015 IBM Corp.

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
exports.defineAutoTests = function() {
	describe('MFPPush test suite', function () {

		var fail = function (done, context, message) {
            if (context) {
                if (context.done) return;
                context.done = true;
            }

            if (message) {
                expect(false).toBe(true, message);
            } else {
                expect(false).toBe(true);
            }
            setTimeout(function () {
                done();
            });
    	};
        var succeed = function (done, context) {
            if (context) {
                if (context.done) return;
                context.done = true;
            }

            expect(true).toBe(true);

            setTimeout(function () {
                done();
            });
        };

		describe('MFPPush API', function() {

			it('MFPPush should exist', function(){
				expect(MFPPush).toBeDefined();
			});

			it('MFPPush.getSubscriptions() should exist and is a function', function(){
				expect(typeof MFPPush.getSubscriptions).toBeDefined();
				expect(typeof MFPPush.getSubscriptions == 'function').toBe(true);
			});

            it('MFPPush.getTags() should exist and is a function', function(){
                expect(typeof MFPPush.getTags).toBeDefined();
                expect(typeof MFPPush.getTags == 'function').toBe(true);
            });

            it('MFPPush.subscribe() should exist and is a function', function(){
                expect(typeof MFPPush.subscribe).toBeDefined();
                expect(typeof MFPPush.subscribe == 'function').toBe(true);
            });

            it('MFPPush.unsubscribe() should exist and is a function', function(){
                expect(typeof MFPPush.unsubscribe).toBeDefined();
                expect(typeof MFPPush.unsubscribe == 'function').toBe(true);
            });

            it('MFPPush.registerDevice() should exist and is a function', function(){
                expect(typeof MFPPush.registerDevice).toBeDefined();
                expect(typeof MFPPush.registerDevice == 'function').toBe(true);
            });

            it('MFPPush.unregisterDevice() should exist and is a function', function(){
                expect(typeof MFPPush.unregisterDevice).toBeDefined();
                expect(typeof MFPPush.unregisterDevice == 'function').toBe(true);
            });

            it('MFPPush.registerNotificationsCallback() should exist and is a function', function(){
                expect(typeof MFPPush.registerNotificationsCallback).toBeDefined();
                expect(typeof MFPPush.registerNotificationsCallback == 'function').toBe(true);
            });

		});

        describe('MFPPush instance', function() {
            var execSpy;
            beforeEach(function() {
                execSpy = spyOn(cordova, "exec");
            });

            it('should call registerDevice and call the success callback', function(done) {
                MFPPush.registerDevice();
                setTimeout(function() {
                    expect(execSpy).toHaveBeenCalled();
                    done();
                }, 100);
            });

            it('should call unregisterDevice and call the success callback', function(done) {
                MFPPush.unregisterDevice();
                setTimeout(function() {
                    expect(execSpy).toHaveBeenCalled();
                    done();
                }, 100);
            });

            it('should call subscribe and call the success callback', function(done) {
                MFPPush.subscribe();
                setTimeout(function() {
                    expect(execSpy).toHaveBeenCalled();
                    done();
                }, 100);
            });

            it('should call unsubscribe and call the success callback', function(done) {
                MFPPush.unsubscribe();
                setTimeout(function() {
                    expect(execSpy).toHaveBeenCalled();
                    done();
                }, 100);
            });

            it('should call getTags and call the success callback', function(done) {
                MFPPush.getTags();
                setTimeout(function() {
                    expect(execSpy).toHaveBeenCalled();
                    done();
                }, 100);
            });

            it('should call getSubscriptions and call the success callback', function(done) {
                MFPPush.getSubscriptions();
                setTimeout(function() {
                    expect(execSpy).toHaveBeenCalled();
                    done();
                }, 100);
            });

        });

	});
};