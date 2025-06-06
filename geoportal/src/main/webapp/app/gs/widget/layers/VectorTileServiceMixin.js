/* See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * Esri Inc. licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define(["dojo/_base/declare",
  "dojo/Deferred",
  "./layerUtil",
  "../util",
  "esri4/request",
  "esri4/layers/VectorTileLayer"],
function(declare, Deferred, layerUtil, util, esriRequest, VectorTileLayer) {

  var _def = declare(null, {

    addVectorTileService: function(serviceUrl,item,itemData) {
      var self = this, dfd = new Deferred(), opLayer = {};
      if (typeof serviceUrl !== "string" || serviceUrl.length === 0) {
        dfd.resolve(null);
        return dfd;
      }
      var self = this;
      var layerId = util.generateId();
      
      var lyr = new VectorTileLayer({url:serviceUrl,id:layerId,opacity:1,visible:true});
      lyr.load();
      var dfd = layerUtil.waitForLayer(self.i18n,lyr);
      dfd.then(function(layer) {
        if (layer && item) {
          layer.title = item.title;
        }
        layerUtil.addMapLayer(self.view,layer,item,self.referenceId);
        self.view.goTo(layer.fullExtent);
      });
      return dfd;      
    }

  });

  return _def;
});
