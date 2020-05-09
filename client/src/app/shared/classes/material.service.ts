declare var M: { toast: (arg0: { html: string; }) => void; };

export class MaterialSerice {
  static toast(message: string) {
    M.toast({ html: message });
  }
}
