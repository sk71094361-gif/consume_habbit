/* Visual enhancement only: no changes to purchase scores, auth or stored records. */
(()=>{
const $=id=>document.getElementById(id);
const paths={wallet:'M4 6h14a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12v2M20 10h-6v5h6M16 12.5h.01',spark:'m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4Z',clock:'M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',layers:'m12 3 9 5-9 5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5',check:'M9 12l2 2 4-4M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0',quote:'M9 6H4v6h5v3l-4 3M20 6h-5v6h5v3l-4 3'};
function icon(name){const n=document.createElementNS('http://www.w3.org/2000/svg','svg');n.setAttribute('viewBox','0 0 24 24');n.setAttribute('class','ui-icon');n.setAttribute('aria-hidden','true');const p=document.createElementNS(n.namespaceURI,'path');p.setAttribute('d',paths[name]||paths.check);n.append(p);return n}
document.querySelectorAll('[data-icon]').forEach(n=>n.prepend(icon(n.dataset.icon)));
document.querySelectorAll('.benefit-icon').forEach((n,i)=>n.replaceChildren(icon(['wallet','spark','clock'][i])));
document.querySelector('.aside-icon')?.replaceChildren(icon('check'));
document.querySelector('.work-banner .clock')?.replaceChildren(icon('clock'));
document.querySelectorAll('.metric-title').forEach((n,i)=>{const text=n.textContent.replace(/^[₩♡◇]\s*/,'');n.replaceChildren(icon(['wallet','spark','layers'][i]),document.createTextNode(text))});
const captions=['내 일상에 잘 어울리는 선택이에요.','조금 더 생각할 시간을 가져볼까요?','지금의 예산을 먼저 돌봐주세요.'];
const sayings=['좋아하는 것에 쓰는 돈도, 나를 돌보는 방법이 될 수 있어요.','오늘 결정하지 않아도 괜찮아요. 마음에도 여유를 남겨주세요.','잠깐 미루는 건 포기가 아니라, 다음 선택을 위한 여유예요.'];
let frame=0;
function setFactor(id,value,max,fill){$(id).replaceChildren(document.createTextNode(String(value)+' '));const small=document.createElement('small');small.textContent='/ '+max;$(id).append(small);const track=$(fill).parentElement;track.setAttribute('role','meter');track.setAttribute('aria-label',$(id).parentElement.querySelector('.factor-label').textContent);track.setAttribute('aria-valuemin','0');track.setAttribute('aria-valuemax',String(max));track.setAttribute('aria-valuenow',String(value));$(fill).style.width=(value/max*100)+'%'}
window.addEventListener('salka:result',e=>{
const r=e.detail;const cash=r.br<=.1?30:r.br<=.25?25:r.br<=.5?15:r.br<=1?5:0,inc=r.ir<=.1?20:r.ir<=.25?15:r.ir<=.5?8:0,use=({30:30,12:24,4:14,1:5,0:0})[r.frequency],alternative=r.alternative==='no'?20:0;
setFactor('factorBudget',cash+inc,50,'budgetFill');setFactor('factorUse',use,30,'useFill');setFactor('factorAlternative',alternative,20,'alternativeFill');
$('budgetNote').textContent=r.price>r.balance?'사용 가능한 잔액을 넘는 구매예요. 금액과 구매 시점을 함께 살펴봐요.':'수입과 잔액에 비해 얼마나 여유 있는 선택인지 살펴본 점수예요.';
$('useNote').textContent=r.frequency===0?'사용 계획이 아직 정해지지 않아 0점으로 표시해요. 가치가 없다는 뜻은 아니에요.':`월 ${r.frequency}회 사용을 가정했어요. 실제 쓸 장면이 떠오르는지도 살펴봐요.`;
$('alternativeNote').textContent=alternative?'비슷한 물건이 없어요. 다만, 꼭 필요한 물건인지는 별도로 생각해주세요.':'이미 가진 물건이 있어요. 새 제품으로 해결되는 불편함이 있는지 확인해봐요.';
$('dailyPhrase').textContent=sayings[r.level];
const ring=$('scoreRing');ring.setAttribute('role','meter');ring.setAttribute('aria-label','구매 적정도');ring.setAttribute('aria-valuemin','0');ring.setAttribute('aria-valuemax','100');ring.setAttribute('aria-valuenow',String(r.score));ring.setAttribute('aria-valuetext',r.score+'점 / 100점. '+captions[r.level]);
if(frame)cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{ $('verdict').textContent=captions[r.level];const c=['#829b93','#8b809e','#b39584'][r.level];ring.style.background=`conic-gradient(${c} 0 ${r.score}%,#eeedf0 ${r.score}% 100%)`;const result=$('results');result.classList.remove('result-enter');void result.offsetWidth;result.classList.add('result-enter');frame=0;});
});
})();
