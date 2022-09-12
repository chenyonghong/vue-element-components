import { ref as f, watch as K, defineComponent as C, toRefs as V, useSlots as W, computed as S, resolveComponent as B, openBlock as m, createBlock as j, normalizeProps as k, guardReactiveProps as $, createSlots as z, withCtx as v, unref as c, createElementBlock as E, Fragment as N, renderList as w, renderSlot as _, createCommentVNode as A, inject as M, onMounted as U, resolveDirective as q, withDirectives as G, mergeProps as L, provide as H, createVNode as J } from "vue";
import Q from "axios";
import { ElTable as X } from "element-plus";
function Y(n) {
  return Object.prototype.toString.call(n).slice(8, -1).toLowerCase();
}
function x(n) {
  let e = !1;
  switch (Y(n)) {
    case "string":
      e = n === "";
      break;
    case "undefined":
      e = !0;
      break;
    case "object":
      e = Object.keys(n).length === 0;
      break;
    case "array":
      e = n.length === 0;
      break;
    case "boolean":
      e = !n;
      break;
    case "null":
      e = !0;
      break;
  }
  return e;
}
function Z(n) {
  const {
    config: { api: e },
    data: u,
    params: a
  } = n, s = f(), i = f(!0);
  async function g() {
    if (!x(u)) {
      s.value = { data: u };
      return;
    }
    !e || (typeof e == "function" ? s.value = await e(a.value) : s.value = await o(e), setTimeout(() => {
      i.value = !1;
    }, 1e3));
  }
  async function o(d) {
    let { method: p, url: l } = d;
    return p === "get" && (l += "?", Object.keys(a.value).forEach((h) => {
      l += h + "=" + a.value[h];
    })), (await Q[p](l, a.value)).data;
  }
  return K(() => a.value, (d, p) => {
    console.log(d, p), g();
  }, {
    deep: !0,
    immediate: !0
  }), {
    data: s,
    loading: i
  };
}
const ee = C({
  name: "ve-table-column"
}), te = /* @__PURE__ */ C({
  ...ee,
  props: {
    column: {
      type: Object,
      default: {}
    }
  },
  setup(n) {
    const e = n, { children: u, ...a } = V(e).column.value, s = W(), i = S(() => {
      for (let o in s)
        if (o.startsWith("column-") && o.slice(7) === a.prop)
          return s[o];
    }), g = S(() => {
      for (let o in s)
        if (o.startsWith("header-") && o.slice(7) === a.prop)
          return s[o];
    });
    return (o, d) => {
      const p = B("ve-table-column"), l = B("el-table-column");
      return m(), j(l, k($(a)), z({
        default: v(() => [
          c(u) ? (m(!0), E(N, { key: 0 }, w(c(u), (r) => (m(), j(p, {
            key: r.prop,
            column: r
          }, z({ _: 2 }, [
            w(o.$slots, (h, b, O) => ({
              name: b,
              fn: v((t) => [
                _(o.$slots, b, k($(t)))
              ])
            }))
          ]), 1032, ["column"]))), 128)) : A("", !0)
        ]),
        _: 2
      }, [
        c(g) ? {
          name: "header",
          fn: v(() => [
            _(o.$slots, "header-" + a.prop)
          ]),
          key: "0"
        } : void 0,
        c(i) ? {
          name: "default",
          fn: v((r) => [
            _(o.$slots, "column-" + a.prop, k($(r)))
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
}), ne = C({
  name: "table_instance"
}), ae = /* @__PURE__ */ C({
  ...ne,
  props: {
    data: {
      type: Array,
      default: []
    },
    columns: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean,
      default: !0
    }
  },
  setup(n) {
    const e = n, { columns: u, data: a } = V(e), s = S(() => {
      if (!u.value.length && a.value.length) {
        let l = [];
        for (let r in a.value[0])
          l.push({
            prop: r,
            label: r
          });
        return l;
      } else
        return u.value.slice();
    }), i = f(), { handleSelectionChange: g, handleInstanceChange: o } = M("methods");
    U(() => {
      o(i.value);
    });
    const d = W(), p = S(() => {
      const l = {};
      for (let r in d)
        (r.startsWith("column-") || r.startsWith("header-")) && (l[r] = d[r]);
      return l;
    });
    return (l, r) => {
      const h = q("loading");
      return G((m(), j(c(X), L({
        ref_key: "table_instance",
        ref: i
      }, l.$attrs, {
        data: c(a),
        onSelectionChange: c(g)
      }), {
        default: v(() => [
          _(l.$slots, "left"),
          (m(!0), E(N, null, w(c(s), (b) => (m(), j(te, { column: b }, z({ _: 2 }, [
            w(c(p), (O, t, y) => ({
              name: t,
              fn: v((D) => [
                _(l.$slots, t, k($(D)))
              ])
            }))
          ]), 1032, ["column"]))), 256)),
          _(l.$slots, "right")
        ]),
        _: 3
      }, 16, ["data", "onSelectionChange"])), [
        [h, n.loading]
      ]);
    };
  }
}), oe = C({
  name: "VeTable"
}), P = /* @__PURE__ */ C({
  ...oe,
  props: {
    config: {
      type: Object,
      default: {
        api: {}
      }
    },
    data: {
      type: Object,
      default: {}
    }
  },
  setup(n, { expose: e }) {
    const u = n, a = f({}), { data: s, loading: i } = Z({ ...u, params: a }), g = f(), o = f(), d = f([]);
    H("methods", {
      handleInstanceChange: (t) => {
        o.value = t;
      },
      handleSelectionChange: (t) => {
        d.value = t;
      }
    }), e({
      el_table: o,
      selections: d,
      loading: i
    });
    const r = f(0), h = S(() => {
      var t, y;
      return ((t = s.value) == null ? void 0 : t.total) || ((y = s.value) == null ? void 0 : y.data.length) || 0;
    });
    function b(t) {
      console.log("size: ", t), a.value.size = t;
    }
    function O(t) {
      console.log("currentPage: ", t), a.value.page = t;
    }
    return (t, y) => {
      var I;
      const D = B("el-pagination");
      return m(), E("div", null, [
        J(ae, L({
          ref_key: "tableRef",
          ref: g,
          data: (I = c(s)) == null ? void 0 : I.data
        }, t.$attrs, { loading: c(i) }), z({ _: 2 }, [
          w(t.$slots, (R, T, ce) => ({
            name: T,
            fn: v((F) => [
              _(t.$slots, T, k($(F)))
            ])
          }))
        ]), 1040, ["data", "loading"]),
        c(x)(u.config.pagination) ? A("", !0) : (m(), j(D, {
          key: 0,
          currentPage: r.value,
          "onUpdate:currentPage": y[0] || (y[0] = (R) => r.value = R),
          "page-size": 100,
          layout: "total, prev, pager, next, jumper, sizes",
          total: c(h),
          onSizeChange: b,
          onCurrentChange: O,
          style: { margin: "10px", float: "right" }
        }, null, 8, ["currentPage", "total"]))
      ]);
    };
  }
});
P.install = function(n) {
  n.component(P.name, P);
};
const le = "0.4.8", re = [P], se = (n) => {
  re.forEach((e) => {
    n.component(e.name, e);
  });
}, pe = {
  install: se,
  version: le
};
export {
  P as VeTable,
  pe as default
};
